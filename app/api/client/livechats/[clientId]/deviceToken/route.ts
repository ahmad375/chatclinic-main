import { dbConnect, LiveChats, Threads, UserUtils } from '@/server'

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

    const deviceToken = user.deviceToken

    return new Response(JSON.stringify({success: true, deviceToken}), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/client/livechats/[clientId]/deviceToken error: ${e}`)
    return new Response(JSON.stringify({success: false}), {
      status: 200
    })
  }
}
