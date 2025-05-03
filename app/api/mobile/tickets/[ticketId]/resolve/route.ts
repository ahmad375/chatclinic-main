import {
  dbConnect,
  Tickets,
  UserUtils,
  Users
} from '@/server'
import type { Ticket } from '@/types'
import { TicketStatus } from '@/enums'
import { verify } from "jsonwebtoken";

export const dynamic = 'force-dynamic'

export async function GET(
  req: Request,
  { params: { ticketId } }: { params: { ticketId: string } }
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

    const user = await Users.findById(userId)
    if(!user)
      return new Response(JSON.stringify({
        success: false,
        error: 'No such user exists.'
      }), {
        status: 200
      })

    const updatedTicket = await Tickets.updateOne<Ticket>(
      {
        user: user._id,
        _id: ticketId
      },
      {
        status: TicketStatus.Resolved
      },
      {
        new: true
      }
    )

    if (!updatedTicket) throw new Error('Update not acknowledged')

    return new Response(
      JSON.stringify({
        success: true,
        notification: {
          type: 'success',
          title: 'Ticket Resolved',
          description: 'Successfully resolved the ticket'
        },
        nextPath: '/dashboard/tickets'
      }),
      {
        status: 200
      }
    )
  } catch (e) {
    console.log(`/api/tickets/[ticketId]/resolve error: ${e}`)
    return new Response(JSON.stringify({success: false, error: `${e}`}), {
      status: 200
    })
  }
}
