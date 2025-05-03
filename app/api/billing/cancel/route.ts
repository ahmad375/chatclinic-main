import { UserUtils, dbConnect, stripe } from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user) throw new Error('Not authenticated')
    if (!user.subscriptionId) throw new Error('No subscriptionId on user')

    await stripe.subscriptions.cancel(user.subscriptionId)

    const apiResponse: APIResponse = {
      success: true,
      notification: {
        type: 'success',
        title: 'Subscription Canceled',
        description: 'Your subscription was successfully canceled'
      }
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
