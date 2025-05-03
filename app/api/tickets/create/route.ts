import { dbConnect, Users, Tickets, getUnauthenticatedResponse, UserUtils } from '@/server'
import type { APIResponse, Ticket } from '@/types'
import { verify } from "jsonwebtoken";
import { UnexpectedErrorResponse } from '@/lib'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { name, email, details } =
      (await req.json()) as Partial<Ticket>

      await dbConnect()

      const user = await UserUtils.getAuthenticatedUser()
  
      if (!user)
        return new Response(
          JSON.stringify(getUnauthenticatedResponse('/dashboard/tickets')),
          {
            status: 200
          }
        )

		if (!email || !details )
      throw new Error('Bad body')

    const ticket = await Tickets.create<Ticket>({
			user: user._id,
			name: name || 'Unnamed Account',
			email,
			details
		})

    const apiResponse: APIResponse<{
      ticket: Ticket
    }> = {
      success: true,
      notification: {
        type: 'success',
        title: 'Ticket Created',
        description: 'Successfully created the ticket'
      },
      ticket
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/tickets/create error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}