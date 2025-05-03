import { dbConnect, LiveChats, Threads, UserUtils, Users } from '@/server'
import { verify } from "jsonwebtoken";

export const dynamic = 'force-dynamic'

export async function GET(
  req: Request,
  {
    params: { clientId, thread: threadUUID }
  }: { params: { clientId: string; thread: string } }
) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({
        error: 'Invalid authorization header'
      }), {
        status: 401
      })
    }
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET!);
    // Extract the user information from the token payload
    const { userId } = decoded as { userId?: string, email?: string };
    await dbConnect()

    if(!(await Users.findById(userId)) || !(await UserUtils.getUserByClientId(clientId)))
      return new Response(JSON.stringify({
        success: false,
        error: 'No such user exists.'
      }), {
        status: 200
      })

    const result = await LiveChats.find({ clientId: clientId })
      .sort({updatedAt: -1})

    return new Response(JSON.stringify(result), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/mobile/livechats/[clientId] error: ${e}`)
    return new Response(JSON.stringify({
      success: false,
      error: `${e}`
    }), {
      status: 200
    })
  }
}
