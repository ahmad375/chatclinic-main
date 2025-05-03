import Stripe from 'stripe'
import {
  UserUtils,
  dbConnect,
  getUnauthenticatedResponse,
  stripe
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import { Plan } from '@/enums'
import type { APIResponse, BillingInfo } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/billing')),
        {
          status: 200
        }
      )

    var plan: Plan = user.plan
    var subscription: Stripe.Subscription | null = null
    var paymentMethod: Stripe.PaymentMethod | null = null

    if (user.subscriptionId && user.plan !== Plan.Free) {
      try {
        subscription = await stripe.subscriptions.retrieve(user.subscriptionId)
        if (subscription.default_payment_method)
          paymentMethod = await stripe.paymentMethods.retrieve(
            subscription.default_payment_method as string
          )
      } catch {}
    }

    const apiResponse: APIResponse<BillingInfo> = {
      success: true,
      plan,
      subscription,
      paymentMethod
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/billing/cancel error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
