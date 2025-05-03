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
        JSON.stringify(getUnauthenticatedResponse('/dashboard/widget')),
        {
          status: 200
        }
      )

    const { defaultMessage } = (await req.json()) as { defaultMessage?: string }

    if (!defaultMessage) throw new Error('No defaultMessage provided')

    const updatedUser = await Users.findOneAndUpdate<User>(
      {
        _id: user._id
      },
      {
        widgetDefaultMessage: defaultMessage
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
        title: 'Updated widget default message',
        description: "Successfully updated your widget's default message"
      },
      user: updatedUser
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/user/widget/updateDefaultMessage error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
