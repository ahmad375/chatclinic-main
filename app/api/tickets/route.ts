import {
  dbConnect,
  Tickets,
  UserUtils,
  getPageParam,
  getUnauthenticatedResponse
} from '@/server'
import { PageLimit, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Ticket } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/tickets')),
        {
          status: 200
        }
      )

    const page = getPageParam(req)

    const q = () =>
      Tickets.find<Ticket>({
        user: user._id
      })

    const totalTickets = await q().countDocuments()

    const tickets = await q()
      .sort({
        createdAt: 'desc'
      })
      .skip((page - 1) * PageLimit)
      .limit(PageLimit)

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
    console.log(`/api/tickets error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
