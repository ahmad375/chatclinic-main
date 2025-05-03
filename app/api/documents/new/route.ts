import {
  dbConnect,
  Documents,
  getUnauthenticatedResponse,
  Paywall,
  UserUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, CreateDocumentResponse, Document } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()
    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/documents')),
        {
          status: 200
        }
      )

    const paywall = new Paywall(user)
    const canCreateDocumentResponse = await paywall.canCreateDocument()
    if (!canCreateDocumentResponse.value)
      return new Response(
        JSON.stringify({
          success: false,
          notification: canCreateDocumentResponse.notification
        } as APIResponse<CreateDocumentResponse>)
      )

    const { pdfContent } = (await req.json()) as { pdfContent: string | null };
    console.log('========pdfContent=============', pdfContent);
    let data, content
    let plainContent, contentString= ''

    if(pdfContent){
      const apiKey = process.env.OPENAI_API_KEY
      const url = 'https://api.openai.com/v1/chat/completions'
      const body = JSON.stringify({
        messages: [
          {
            role: 'system',
            content:
              `You're an AI assistant that replies with title, subtitle and paragraphs to all my questions or sentences.
              paragraphs must be array of string letter lines, which is splitted, when you rearranged my request full sentences to good formatted view.
              If possible, you should include the majority of the sentences from my request, including bullet-style sentences, in the 'paragraphs' property without any customization.
              Must remember!. You must respond your answer as json stringified. Any other sentences are not needed. the answer is json like "{title: extracted_title, subtitle:extracted_subtitle, paragraphs: extracted_paragraphs}"`,
          },
          { role: 'assistant', content: 'Hi! How can I help you?' },
          { role: 'user', content: `${pdfContent}. Analyze carefully and give me answer.` },
        ],
        model: 'gpt-3.5-turbo',
        stream: false,
      })
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body,
      })
      const unParsed_data = (await response.json()).choices[0].message.content;
      console.log('==========openAI_result_unParsed_data===============', unParsed_data)
      data = await JSON.parse(unParsed_data)
      console.log('==========openAI_result===============', data)
      content = {
        type: "doc",
        content: data.paragraphs.map((paragraph: string) => ({
          type: "paragraph",
          content: [{ type: "text", text: paragraph }]
        }))
      };
      contentString = JSON.stringify(content);
      plainContent = data.paragraphs.join(' ');
    }
    const document = (await Documents.create<Document>({
      user: user._id,
      title: data? data.title: 'Untitled Document',
      // subtitle: pdfContent
      subtitle: data? data.subtitle: '',
      content: data? contentString: '',
      // content: data? `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"${data.paragraphs[0]}"},{"type":"hardBreak"}]}]}`: '',
      plainContent: data? plainContent: ''
      // plainContent: `Adding ChatClinic to your website mainly involves adding the ChatClinic installation script to your website's HTML code.Log in to your accountNavigate to your Widget (https://www.chatclinicai.com/dashboard/widget) from your dashboardCopy the "Installation Tag" and make sure it is included in the "head" section of each page you would like the widget to appear onIf you need help installing the widget on your website, feel free to reach out to our support team. We will gladly provide installation support.`
    })) as Document

    if (!document) throw new Error('No document created')

    return new Response(
      JSON.stringify({
        success: true,
        notification: {
          type: 'success',
          title: 'Document Created',
          description: 'Successfully created a new document'
        },
        document,
        nextPath: `/dashboard/documents/${document._id}`
      } as APIResponse<CreateDocumentResponse>),
      {
        status: 200
      }
    )
  } catch (e) {
    console.log(`/api/documents/new error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
