import {
  dbConnect,
  getUnauthenticatedResponse,
  Tickets,
  UserUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Ticket } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(
  _: Request,
  { params: { ticketId } }: { params: { ticketId: string } }
) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(
          getUnauthenticatedResponse(`/dashboard/tickets/${ticketId}`)
        ),
        {
          status: 200
        }
      )

    const ticket = await Tickets.findOne<Ticket>({
      user: user._id,
      _id: ticketId
    })

    if (!ticket) {
      const notFoundAPIResponse: APIResponse = {
        success: false,
        notification: {
          type: 'error',
          title: 'Ticket Not Found',
          description: 'The ticket you are looking for does not exist'
        },
        nextPath: '/dashboard/tickets'
      }
      return new Response(JSON.stringify(notFoundAPIResponse), {
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
    console.log(`/api/tickets/[ticketId] error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
