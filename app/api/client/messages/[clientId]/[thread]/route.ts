import { dbConnect, Messages, Threads, UserUtils } from '@/server'
import { MessagesLimit } from '@/lib'
import type { Thread, Message } from '@/types'

export const dynamic = 'force-dynamic'

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

    const thread = await Threads.findOne<Thread>({
      user: user._id,
      uuid: threadUUID
    })

    if (!thread) throw new Error('No such thread')

    const { searchParams } = new URL(req.url)
    const pageParam = searchParams.get('p') as string | undefined

    var page: number
    try {
      if (!pageParam) throw new Error('No page param')
      page = parseInt(pageParam)
      if (isNaN(page)) throw new Error('Invalid page param')
    } catch {
      page = 1
    }

    const messages = (
      await Messages.find<Message>({
        user: user._id,
        thread: thread._id
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * MessagesLimit)
        .limit(MessagesLimit)
    ).reverse()

    return new Response(JSON.stringify(messages), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/messages/[clientId]/[thread] error: ${e}`)
    return new Response(JSON.stringify([]), {
      status: 200
    })
  }
}
