import { dbConnect, Users, Tickets } from '@/server'
import type { Ticket } from '@/types'
import { verify } from "jsonwebtoken";

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { name, email, details } =
      (await req.json()) as Partial<Ticket>

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

    if(!(await Users.findById(userId)))
      return new Response(JSON.stringify({
        success: false,
        error: 'No such user exists.'
      }), {
        status: 200
      })

		if (!email || !details )
			return new Response(JSON.stringify({
        success: false,
        error: 'Please provide email and ticket details.'
      }), {
        status: 200
      })
    // const thread = await Threads.findOne<Thread>({
    //   user: user._id,
    //   uuid: threadUUID
    // })
    // if (!thread) throw new Error('No such thread')

    await Tickets.create<Ticket>({
			user: userId,
			name: name || 'Unnamed Account',
			email,
			details
		})

    return new Response(JSON.stringify({success:true}), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/mobile/tickets/create error: ${e}`)
    return new Response(JSON.stringify({success: false, error: `${e}`}), {
      status: 200
    })
  }
}
