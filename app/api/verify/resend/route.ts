import { nanoid } from 'nanoid'
import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, Users, SendEmail } from '@/server'
import type { User } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { email } =
      (await req.json()) as {
        email?: string
      }

    if (!email)
      return {
        success: false,
        notification: {
          type: 'error',
          title: 'Your request is invalid.',
          // description: 'Please sign up again.'
        }
      }

    await dbConnect()

    const user = await Users.findOne<User>({email})
    if (!user){
      return {
        success: false,
        notification: {
          type: 'error',
          title: 'No such user exists',
          description: 'Please sign up again.'
        }
      }
    }else {
      const recoverToken = nanoid()

      const { acknowledged } = await Users.updateOne<User>(
        {
          email: email
        },
        {
          recoverToken: recoverToken
        }
      )

      if (!acknowledged)
        throw new Error('Failed to create your token')
      
      const email_Content = `
        Dear ${user.name},

        We are thrilled to have you on board with our service! Thank you for signing up.

        Please click the link below to verify your email:
        ${process.env.NEXT_PUBLIC_APP_URI}/isverified?email=${encodeURIComponent(email.toLowerCase())}&token=${encodeURIComponent(recoverToken)}
      
        If you have any questions or need assistance, please don't hesitate to reach out to our support team at hello@chatclinicai.com
      
        We look forward to providing you with a great experience!
      
        Best regards,
        Chat Clinic AI Team
      `

      const subject = '🎉Welcome to ChatClinic'
      await SendEmail.mailSender(email, subject, email_Content)
      
      return new Response(JSON.stringify({
        success:true,
        notification: {
          type: 'success',
          title: `We've sent verification email again.`,
          // description: ''
        }
      }), {
        status: 200
      })
    }

    // return new Response(JSON.stringify({success:true}), {
    //   status: 200
    // })
  } catch (e) {
    console.log(`/api/verify/resend error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
