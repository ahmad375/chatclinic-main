import { UserUtils, Users, dbConnect, stripe } from '@/server'
import { UnexpectedErrorResponse, getPlanInfo } from '@/lib'
import { Plan } from '@/enums'
import { type APIResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user) throw new Error('Not authenticated')

    const { plan, paymentMethodId } = (await req.json()) as {
      plan?: Plan
      paymentMethodId?: string
    }

    if (!plan || !paymentMethodId || !Object.values(Plan).includes(plan))
      throw new Error('Bad body')

    if (paymentMethodId) {
      const { data: existingPaymentMethods } =
        await stripe.customers.listPaymentMethods(user.customerId, {
          type: 'card',
          limit: 100
        })

      if (
        !existingPaymentMethods.map((pm) => pm.id).includes(paymentMethodId)
      ) {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: user.customerId
        })
        await stripe.customers.update(user.customerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId || undefined
          }
        })
      }
    }

    const subscriptionResult = await stripe.subscriptions.create({
      customer: user.customerId,
      items: [
        {
          price: getPlanInfo(plan).priceId
        }
      ],
      default_payment_method: paymentMethodId
    })
    console.log('=====subscriptionResult: ========', subscriptionResult)

    let apiResponse: APIResponse;
    if(subscriptionResult.status === 'active'){
      apiResponse = {
        success: true,
        notification: {
          type: 'success',
          title: 'Subscribed!',
          description: 'You have successfully subscribed'
        }
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
    console.log(`/api/billing/subscribe error: ${e}`)
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
