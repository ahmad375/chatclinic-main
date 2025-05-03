import {
  dbConnect,
  getUnauthenticatedResponse,
  Tickets,
  UserUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { Ticket } from '@/types'
import { TicketStatus } from '@/enums'

export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
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
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
