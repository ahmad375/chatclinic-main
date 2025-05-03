import { UserUtils, Users, dbConnect } from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import { User, type APIResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const {
      email: __email,
      token,
      password
    } = (await req.json()) as {
      email?: string
      token?: string
      password?: string
    }

    if (!__email || !token || !password)
      throw new Error('No email/token/password provided in the body')

    await dbConnect()

    const email = __email.toLowerCase()

    const user = await Users.findOne<User>({
      email,
      recoverToken: token
    })

    if (!user)
      return new Response(
        JSON.stringify({
          success: false,
          notification: {
            type: 'error',
            title: 'Malformed Reset Link',
            description: 'This is not a valid password reset link'
          }
        } as APIResponse),
        {
          status: 200
        }
      )

    const passwordUpdated = await UserUtils.updatePassword(user._id, password)

    if (!passwordUpdated) throw new Error('Failed to update password')

    const apiResponse: APIResponse = {
      success: true,
      notification: {
        type: 'success',
        title: 'Password Reset',
        description: 'Please log in with your new password'
      },
      nextPath: '/login'
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/reset error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
