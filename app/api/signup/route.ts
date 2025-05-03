import { nanoid } from 'nanoid'
import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, SendEmail } from '@/server'
import type { User } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { name, email, website, password, tos, tosUserAgent, plan, customerId } =
      (await req.json()) as Partial<User>

    if (!name || !email || !password || !tos || !tosUserAgent || !plan )
      throw new Error('Bad body')

    await dbConnect()

    var clientId: string | undefined

    do {
      clientId = nanoid()
    } while (await UserUtils.getUserByClientId(clientId))

    const recoverToken = nanoid()

    const signUpResponse = await UserUtils.signUp(
      {
        name,
        email,
        website,
        tos,
        tosUserAgent,
        clientId,
        plan,
        customerId: customerId? customerId: '',
        recoverToken
      },
      password
    )

    const email_Content = `
      Dear ${name},

      We are thrilled to have you on board with Chat Clinic AI! Thank you for signing up.

      Please click the link below to verify your email:
      ${process.env.NEXT_PUBLIC_APP_URI}/isverified?email=${encodeURIComponent(email.toLowerCase())}&token=${encodeURIComponent(recoverToken)}
    
      If you have any questions or need assistance, please don't hesitate to reach out to our support team at hello@chatclinicai.com
    
      We look forward to providing you with a great experience!
    
      Best regards,
      Chat Clinic AI Team
    `

    const subject = '🎉Welcome to ChatClinic'
    await SendEmail.mailSender(email, subject, email_Content)

    return new Response(JSON.stringify(signUpResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/signup error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
