import {
  dbConnect,
  getUnauthenticatedResponse,
  Tickets,
  UserUtils,
  Users
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Ticket } from '@/types'
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

    if(!(await Users.findById(userId)))
      return new Response(JSON.stringify({
        success: false,
        error: 'No such user exists.'
      }), {
        status: 200
      })

    const ticket = await Tickets.findOne<Ticket>({
      user: userId,
      _id: ticketId
    })

    if (!ticket) {
      return new Response(JSON.stringify({
        success: false,
        error: "Ticket not found."
      }), {
        status: 200
      })
    }

    const apiResponse: APIResponse<{
      ticket: Ticket
    }> = {
      success: true,
      ticket
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/mobile/tickets/[ticketId] error: ${e}`)
    return new Response(JSON.stringify({
      success: false,
      error: `${e}`
    }), {
      status: 200
    })
  }
}
