import {
  dbConnect,
  UserUtils,
  getUnauthenticatedResponse,
  Users
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { User, APIResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/profile')),
        {
          status: 200
        }
      )

    const { workingHours } = (await req.json()) as { workingHours?: User['workingHours'] }

    if (!workingHours) throw new Error('No workingHours provided')

    const updatedUser = await Users.findOneAndUpdate<User>(
      {
        _id: user._id
      },
      {
        workingHours: workingHours
      },
      {
        new: true
      }
    )

    if (!updatedUser) throw new Error('Could not update user')

    const apiResponse: APIResponse<{ user: User }> = {
      success: true,
      notification: {
        type: 'success',
        title: 'Updated working hours',
        description: "Successfully updated your working hours"
      },
      user: updatedUser
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/user/profile/updateWorkingHours error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
