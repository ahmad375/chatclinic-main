import { dbConnect, LiveChats, Threads, UserUtils } from '@/server'
import { MessagesLimit } from '@/lib'
import type { Thread, Message } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(
  req: Request,
  {
    params: { clientId, thread: thread }
  }: { params: { clientId: string; thread: string } }
) {
  try {
    await dbConnect()

    const user = await UserUtils.getUserByClientId(clientId)

    if (!user) throw new Error('No such user')

    // const thread = await Threads.findOne<Thread>({
    //   user: user._id,
    //   uuid: threadUUID
    // })

    // if (!thread) throw new Error('No such thread')
    const result = await LiveChats.findOne({ thread: thread })
      .select('activeFlag') 
    // const messages = result.messages;

    return new Response(JSON.stringify(result.activeFlag), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/client/livechats/[clientId]/[thread]/checkStatus error: ${e}`)
    return new Response(JSON.stringify([]), {
      status: 200
    })
  }
}
