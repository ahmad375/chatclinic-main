import {
  dbConnect,
  UserUtils,
  getUnauthenticatedResponse,
  Users
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { WidgetTheme, User, APIResponse } from '@/types'

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

    const { widgetTheme } = (await req.json()) as { widgetTheme?: WidgetTheme }

    if (!widgetTheme) throw new Error('No widgetTheme provided')

    const updatedUser = await Users.findOneAndUpdate<User>(
      {
        _id: user._id
      },
      {
        widgetTheme
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
        title: 'Updated widget theme',
        description: "Successfully updated your widget's theme"
      },
      user: updatedUser
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/user/widget/updateTheme error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
