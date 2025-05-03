import { nanoid } from 'nanoid'
import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, Threads, LiveChats } from '@/server'
import type { LiveChat, Thread } from '@/types'

export async function POST(req: Request,
  {
    params: { clientId, thread: thread }
  }: { params: { clientId: string; thread: string } }
) {
  try {
    const { newMessage } =
      (await req.json())

    await dbConnect()

    const user = await UserUtils.getUserByClientId(clientId)

    if (!user) throw new Error('No such user')

    // const thread = await Threads.findOne<Thread>({
    //   user: user._id,
    //   uuid: threadUUID
    // })
    // if (!thread) throw new Error('No such thread')

    const result = await LiveChats.findOneAndUpdate(
      { thread: thread }, // Find the live chat by thread ID
      { $push: { messages: newMessage } }, // Add the new message to the messages array
      { new: true } // Return the updated document
    );

    return new Response(JSON.stringify({success:true}), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/livechats/[clientId]/[thread]/message error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
