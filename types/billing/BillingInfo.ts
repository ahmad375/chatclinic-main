import Stripe from 'stripe'
import { Plan } from '@/enums'

export interface BillingInfo {
  plan: Plan
  subscription: Stripe.Subscription | null
  paymentMethod: Stripe.PaymentMethod | null
}
