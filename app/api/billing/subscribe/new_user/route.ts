import { stripe, SendEmail, Users, dbConnect } from '@/server'
import { UnexpectedErrorResponse, getPlanInfo } from '@/lib'
import { Plan } from '@/enums'
import { type APIResponse, User } from '@/types'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    const { name, email, plan, paymentMethodId } = (await req.json()) as {
      name?: string
      email?: string
      plan?: Plan
      paymentMethodId?: string
    }

    const customer = await stripe.customers.create({
      email,
      name
    })

    if (!name || !email || !plan || !paymentMethodId || !Object.values(Plan).includes(plan))
      throw new Error('Bad body')

    if (paymentMethodId) {
      const { data: existingPaymentMethods } =
        await stripe.customers.listPaymentMethods(customer.id, {
          type: 'card',
          limit: 100
        })

      if (
        !existingPaymentMethods.map((pm) => pm.id).includes(paymentMethodId)
      ) {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id
        })
        await stripe.customers.update(customer.id, {
          invoice_settings: {
            default_payment_method: paymentMethodId || undefined
          }
        })
      }
    }

    const subscriptionResult = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: getPlanInfo(plan).priceId
        }
      ],
      default_payment_method: paymentMethodId
    })
    console.log('=====subscriptionResult: ========', subscriptionResult)

    let apiResponse: APIResponse<{customerId?:string, password?:string}>;
    if(subscriptionResult.status === 'active'){
      const recoverToken = nanoid()
      const password = nanoid(10)
      const subject = '🎉Welcome to ChatClinic'
      const clientId = nanoid()
      const hashedPassword = await bcrypt.hash(
        password,
        12
      )
      const newUser: Partial<User> = {
        name,
        email: email.toLowerCase(),
        website:'',
        password: hashedPassword,
        tos: Date.now(),
        // tosUserAgent: '',
        clientId,
        plan,
        customerId: customer.id,
        recoverToken,
        isVerified: true
        // subscriptionId: subscription.id
      }

      await Users.create<User>(newUser);

      const email_Content = `
        Dear ${name},

        We are thrilled to have you on board with our service! Thank you for subscribing.
      
        Here is your initial password: ${password}

        Please click the link below to update your initial password:
        ${process.env.NEXT_PUBLIC_APP_URI}/reset?email=${encodeURIComponent(email.toLowerCase())}&token=${encodeURIComponent(recoverToken)}
      
        We recommend updating your password as soon as possible to ensure the security of your account.
      
        If you have any questions or need assistance, please don't hesitate to reach out to our support team at hello@chatclinicai.com
      
        We look forward to providing you with a great experience!
      
        Best regards,
        Chat Clinic AI Team
      `
      await SendEmail.mailSender(email, subject, email_Content)
      apiResponse = {
        success: true,
        notification: {
          type: 'success',
          title: 'Subscribed!',
          description: 'You have successfully subscribed'
        },
        customerId: customer.id,
        password: password
      }
    }else {
      apiResponse = {
        success: false,
        notification: {
          type: 'error',
          title: 'Error!',
          description: 'There was an issue with your credit card.'
        }
      }
    }
    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })

  } catch (e) {
    console.log(`/api/billing/subscribe/new_user error: ${e}`)
    const apiResponse = {
      success: false,
      notification: {
        type: 'error',
        title: `${e}`,
        // description: `${e}`
      }
    }
    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  }
}
