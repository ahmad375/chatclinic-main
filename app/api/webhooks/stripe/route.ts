import { headers } from 'next/headers'
import CORS from 'micro-cors'
import { Users, dbConnect, stripe } from '@/server'
import { Plan } from '@/enums'
import { getPlanInfo } from '@/lib'

const cors = CORS({
  allowMethods: ['POST', 'HEAD']
})

export async function POST(req: Request) {
  try {
    const body = await req.text()

    const signature = headers().get('stripe-signature') as
      | string
      | null
      | undefined

    if (!signature) throw new Error('Bad signature')

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    await dbConnect()

    switch (event.type) {
      case 'invoice.paid':
        const paidInvoice = event.data.object
        if (paidInvoice.lines.data.length) {
          const line = paidInvoice.lines.data[0]
          if (line.price) {
            const price = line.price
            const foundPlan = Object.values(Plan)
              .map((plan) => ({ plan, priceId: getPlanInfo(plan).priceId }))
              .find(({ priceId }) => price.id === priceId)
            if (foundPlan) {
              const { plan } = foundPlan
              await Users.updateOne(
                {
                  customerId: paidInvoice.customer
                },
                {
                  plan,
                  subscriptionId: paidInvoice.subscription,
                  messageUsage: 0
                }
              )
            }
          }
        }

        break
      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object
        console.log('updated subscription')
        console.log(updatedSubscription)
        break
      //   case 'customer.subscription.created':
      //     const createdSubscription = event.data.object

      //     console.log('created subscription')
      //     console.log(createdSubscription)

      //     break
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object

        console.log('deleted subscription')

        await Users.updateOne(
          {
            customerId: deletedSubscription.customer
          },
          {
            plan: Plan.Free,
            subscriptionId: null,
            messageUsage: 0
          }
        )
        break
    }

    return new Response(
      JSON.stringify({
        result: event,
        ok: true
      }),
      {
        status: 200
      }
    )
  } catch (e) {
    console.log(`/api/webhooks/stripe error: ${e}`)
    return new Response(null, {
      status: 500
    })
  }
}
