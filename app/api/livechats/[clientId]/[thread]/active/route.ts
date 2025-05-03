import { nanoid } from 'nanoid'
import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, Threads, LiveChats } from '@/server'
import type { LiveChat, Thread } from '@/types'

export async function GET(req: Request,
  {
    params: { clientId, thread }
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

    await LiveChats.updateMany({ clientId }, { $set: { activeFlag: 0 } });
    // await LiveChats.updateOne({ thread: thread }, { $set: { activeFlag: 1 } });
    await LiveChats.updateOne(
        { thread: thread },
        {
          $set: {
            activeFlag: 1,
            "messages.$[].readFlag": 1
          }
        }
      );

    return new Response(JSON.stringify({success:true}), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/livechats/[clientId]/[thread]/active error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
