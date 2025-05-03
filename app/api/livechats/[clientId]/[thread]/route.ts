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
    console.log('=======newLiveChat==========', result)

    return new Response(JSON.stringify(result), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/livechats/[clientId]/[thread] error: ${e}`)
    return new Response(JSON.stringify([]), {
      status: 200
    })
  }
}
