import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
  type JSONValue
} from 'ai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/index'
import {
  PineconeUtils,
  ThreadUtils,
  Tickets,
  UserUtils,
  dbConnect,
  openai,
  Documents,
  Pages,
  Threads,
  Questions,
  Videos,
  Users,
  Paywall
} from '@/server'
import { getSystemMessage, chatCompletionConfig, toPlainObject } from '@/lib'
import { MessageRole, Function } from '@/enums'
import {
  type Message,
  type Ticket,
  type Document,
  type RecordMetadata,
  type StreamData,
  type Page,
  type Thread,
  type Question,
  type Video
} from '@/types'

export const dynamic = 'force-dynamic'
const UnexpectedErrorNotification =
  'Uh oh, an unexpected error occurred. Please try again in a few minutes.'

export async function POST(req: Request) {
  try {
    const {
      clientId,
      thread,
      messages: __messages
    } = (await req.json()) as {
      clientId?: string
      thread?: string
      messages?: ChatCompletionMessageParam[]
    }

    if (!clientId) throw new Error('No clientId in body')
    if (!thread) throw new Error('No thread uuid')
    if (!__messages) throw new Error('No messages in body')

    await dbConnect()

    const user = await UserUtils.getUserByClientId(clientId)
    if (!user) throw new Error('No user associated with clientId')

    const paywall = new Paywall(user)

    if (!(await paywall.canCreateMessage()))
      return new Response(UnexpectedErrorNotification, {
        status: 200
      })

    const __thread = await Threads.findOne<Thread>({
      user: user._id,
      uuid: thread
    })

    if (!__thread) throw new Error('No such thread')

    const pinecone = new PineconeUtils(user)
    // Limit to last 10 messages from conversation history
    const truncatedMessages = __messages.slice(-10)

    /* Messages with the system prompt */
    const messages = [getSystemMessage({}), ...truncatedMessages]
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        ...chatCompletionConfig,
        messages,
        stream: true,
        function_call: 'auto'
      })
    })

    const data = new experimental_StreamData()
    var recordMetadata: RecordMetadata | null = null

    const stream = OpenAIStream(response, {
      experimental_streamData: true,
      async experimental_onFunctionCall(
        functionCallPayload,
        createFunctionCallMessages
      ) {
        const castedFunctionCallPayload = functionCallPayload as
          | {
              name: Function.FileSupportTicket
              arguments: {
                name?: string
                email?: string
                details?: string
              }
            }
          | {
              name: Function.SearchKnowledgeBase
              arguments: { query?: string }
            }
        const { name, arguments: args } = castedFunctionCallPayload
        var value: JSONValue = []

        switch (name) {
          case Function.FileSupportTicket:
            const lastTicket = await Tickets.find({ user: user._id })
              .sort({ createdAt: -1 }) // sort by createdAt in descending order
              .limit(1) // get the first (most recent) result
              .exec();
            if((lastTicket[0].email === args.email) || (lastTicket[0].name === args.name)){
              await Tickets.updateOne({_id: lastTicket[0]._id},{
                user: user._id,
                ...args
              })
            }else {
              await Tickets.create<Ticket>({
                user: user._id,
                ...args
              })
            }
            value = { success: true }
            break
          case Function.SearchKnowledgeBase:
            if (args.query) {
              const snippets = await pinecone.query(args.query)

              if (snippets.length) {
                recordMetadata = snippets[0]
              }

              value = snippets
            }

            break
          default:
            value = []
            break
        }

        const newMessages = createFunctionCallMessages(value)

        return await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            ...chatCompletionConfig,
            messages: [...messages, ...newMessages],
            stream: true
          })
        })
      },
      async onFinal(completion) {
        if (messages.length && messages[messages.length - 1].role === 'user') {
          // add in pairs
          const lastMessage = messages[messages.length - 1]

          var annotations: Message['annotations'] = {}

          if (recordMetadata) {
            if (recordMetadata.document) {
              const document = await Documents.findOne<Document>({
                _id: recordMetadata.document
              })
              if (document) annotations.document = document
            } else if (recordMetadata.page) {
              const page = await Pages.findOne<Page>({
                _id: recordMetadata.page
              })
              if (page) annotations.page = page
            } else if (recordMetadata.question) {
              const question = await Questions.findOne<Question>({
                _id: recordMetadata.question
              })
              if (question) annotations.question = question
            } else if (recordMetadata.video) {
              const video = await Videos.findOne<Video>({
                _id: recordMetadata.video
              })
              if (video) annotations.video = video
            }
          }

          if (lastMessage.content) {
            await Users.updateOne(
              {
                _id: user._id
              },
              {
                $inc: {
                  messageUsage: 1
                }
              }
            )
            const addedMessages = await ThreadUtils.addMessages(user, thread, [
              {
                role: MessageRole.User,
                content: lastMessage.content as string
              },
              {
                role: MessageRole.Assistant,
                content: completion,
                annotations
              }
            ])
            if (addedMessages.length === 2) {
              // @ts-ignore
              data.append({
                annotatedMessage: toPlainObject(addedMessages[1])
              } as StreamData)
            }
          }
        }

        // Make sure to close stream
        await data.close()
      }
    })

    return new StreamingTextResponse(stream, {}, data)
  } catch (e) {
    console.log(`/api/client/chat error: ${e}`)
    return new Response(UnexpectedErrorNotification, {
      status: 200
    })
  }
}
