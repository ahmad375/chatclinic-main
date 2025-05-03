import {
  dbConnect,
  Tickets,
  UserUtils,
  getPageParam,
  getUnauthenticatedResponse,
  Users
} from '@/server'
import { PageLimit, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Ticket } from '@/types'
import { verify } from "jsonwebtoken";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
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

    const page = getPageParam(req)

    const q = () =>
      Tickets.find<Ticket>({
        user: userId
      })

    const totalTickets = await q().countDocuments()

    const tickets = await q()
      .sort({
        createdAt: 'desc'
      })
      // .skip((page - 1) * PageLimit)
      // .limit(PageLimit)

    const apiResponse: APIResponse<{
      tickets: Ticket[]
      totalTickets: number
    }> = {
      success: true,
      tickets,
      totalTickets
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/mobile/tickets error: ${e}`)
    return new Response(JSON.stringify({
      success: false,
      error: `${e}`
    }), {
      status: 200
    })
  }
}
