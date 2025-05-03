import { UserUtils, dbConnect, getUnauthenticatedResponse, Users } from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import { type APIResponse } from '@/types'
import bcrypt from 'bcryptjs'

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

    const { oldPassword, newPassword } = (await req.json()) as { newPassword: string, oldPassword: string }

    if (!newPassword || !oldPassword) throw new Error(`The password can't be empty`)
    
    const user_with_password = await Users.findById(user._id)

    if (!(await bcrypt.compare(oldPassword, user_with_password.password))){
      return new Response(JSON.stringify({
        success: false,
        notification: {
          type: 'error',
          title: 'Current password you typed is incorrect',
        }
      }), {
        status: 200
      })
    }

    const passwordUpdated = await UserUtils.updatePassword(user._id, newPassword)

    if (!passwordUpdated) throw new Error('Failed to update password')

    const apiResponse: APIResponse = {
      success: true,
      notification: {
        type: 'success',
        title: 'Password Change',
        description: `You've successfully changed your password.`
      },
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/user/profile/changePassword error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
