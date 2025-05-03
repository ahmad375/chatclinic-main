import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, Users, LiveChats } from '@/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request,
  {
    params: { clientId, thread }
  }: { params: { clientId: string; thread: string } }
) {
  try {
		await dbConnect()

    const user = await UserUtils.getUserByClientId(clientId)

    if (!user) throw new Error('No such user')

    await LiveChats.deleteOne(
      { 
        clientId: clientId,
        thread: thread
      },
    );

    return new Response(JSON.stringify({
      success: true,
      notification: {
        type: 'success',
        title: 'Chat Room Removed',
        description: 'Successfully removed the chat room'
      },
      nextPath: '/dashboard/messages'
    }), {
      status: 200,
    })
  } catch (e) {
    console.log(`/api/livechats/[clientId]/[thread]/delete error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
