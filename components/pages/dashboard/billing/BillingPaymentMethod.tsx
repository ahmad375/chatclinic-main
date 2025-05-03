'use client'
import type { FC } from 'react'
import Stripe from 'stripe'
import { Heading } from '@chakra-ui/react'
import { toTitleCase } from '@/lib'
import { DashboardSectionItem } from '@/components/dashboard'

export const BillingPaymentMethod: FC<{
  paymentMethod?: Stripe.PaymentMethod | null
  loading: boolean
}> = ({ paymentMethod, loading }) => {
  return (
    <DashboardSectionItem title='Payment Method' {...{ loading }}>
      <Heading fontSize='1.5em' color='secondary.900'>
        {paymentMethod && paymentMethod.card
          ? `${toTitleCase(paymentMethod.card.brand)} ending in ${
              paymentMethod.card.last4
            }`
          : 'N/A'}
      </Heading>
    </DashboardSectionItem>
  )
}
