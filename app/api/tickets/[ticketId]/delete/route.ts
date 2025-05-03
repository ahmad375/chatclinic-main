import { nanoid } from 'nanoid'
import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, Users, Tickets, getUnauthenticatedResponse } from '@/server'
import type { LiveChat, Thread } from '@/types'
import { verify } from "jsonwebtoken";

export const dynamic = 'force-dynamic'

export async function GET(req: Request,
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

    await Tickets.deleteOne(
      {
        user: user._id,
        _id: ticketId
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        notification: {
          type: 'success',
          title: 'Ticket Removed',
          description: 'Successfully removed the ticket'
        },
        nextPath: '/dashboard/tickets'
      }),
      {
        status: 200
      }
    )
  } catch (e) {
    console.log(`/api/tickets/[ticketId]/delete error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}