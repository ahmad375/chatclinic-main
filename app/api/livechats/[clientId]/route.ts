import { dbConnect, LiveChats, Threads, UserUtils } from '@/server'
import { MessagesLimit } from '@/lib'

export async function GET(
  req: Request,
  {
    params: { clientId, thread: threadUUID }
  }: { params: { clientId: string; thread: string } }
) {
  try {
    await dbConnect()

    const user = await UserUtils.getUserByClientId(clientId)

    if (!user) throw new Error('No such user')

    const result = await LiveChats.find({ clientId: clientId })
      .sort({updatedAt: -1})

    return new Response(JSON.stringify(result), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/livechats/[clientId] error: ${e}`)
    return new Response(JSON.stringify([]), {
      status: 200
    })
  }
}
