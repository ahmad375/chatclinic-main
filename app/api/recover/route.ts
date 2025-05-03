import { nanoid } from 'nanoid'
import { Users, dbConnect, SendEmail } from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import { User, type APIResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { email: __email } = (await req.json()) as { email?: string }

    if (!__email) throw new Error('No email provided in the body')

    await dbConnect()

    const email = __email.toLowerCase()
    const existingUser = await Users.findOne<User>({
      email
    })

    if (!existingUser)
      return new Response(
        JSON.stringify({
          success: false,
          notification: {
            type: 'error',
            title: 'No Such Account',
            description: `There is no account associated with the email address "${email}"`
          }
        } as APIResponse),
        {
          status: 200
        }
      )

    const recoverToken = nanoid()

    const { acknowledged } = await Users.updateOne<User>({
      email
    },{
      $set:{recoverToken}
    })

    if (!acknowledged) throw new Error('Failed to acknowledge update')

    const subject = 'Reset Password'
    const email_Content = `
      Dear ${existingUser.name},
   
      Please click the link below to reset your password:
      ${process.env.NEXT_PUBLIC_APP_URI}/reset?email=${encodeURIComponent(email)}&token=${encodeURIComponent(recoverToken)}
    
      If you have any questions or need assistance, please don't hesitate to reach out to our support team at hello@chatclinicai.com
    
      Best regards,
      Chat Clinic AI Team
    `

    await SendEmail.mailSender(email, subject, email_Content)

    const apiResponse: APIResponse = {
      success: true,
      notification: {
        type: 'success',
        title: 'Recovery Email Sent',
        description: 'Please check your inbox for your password reset link'
      }
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/recover error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
