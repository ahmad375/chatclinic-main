import { Plan } from '@/enums'
import {
  Documents,
  Messages,
  Questions,
  Threads,
  Tickets,
  Users,
  dbConnect,
  openai
} from '@/server'
import {
  type Message,
  type User,
  type Thread,
  type Document,
  type Question,
  type Ticket
} from '@/types'

export async function GET() {
  try {
    if (process.env.NODE_ENV !== 'development') throw new Error()

    await dbConnect()

    const allUsers = await Users.find<User>()
    // const allMessages = await Messages.find<Message>()
    // const allThreads = await Threads.find<Thread>()
    // const allDocuments = await Documents.find<Document>()
    // const allQuestions = await Questions.find<Question>()
    // const allTickets = await Tickets.find<Ticket>()

    // await Users.updateOne(
    //   {
    //     email: 'demo@deal.ai'
    //   },
    //   {
    //     plan: Plan.Enterprise,
    //     subscriptionId: null,
    //     name: 'ChatClinic Demo'
    //   }
    // )

    return new Response(
      JSON.stringify({
        allUsers: allUsers.map((u) => u.email)
        // allMessages,
        // allThreads,
        // allDocuments,
        // allQuestions,
        // allTickets
      }),
      {
        status: 200
      }
    )
  } catch (e) {
    console.log(e)
    return new Response(null, {
      status: 200
    })
  }
}
