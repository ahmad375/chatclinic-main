'use client'
import type { FC } from 'react'
import Stripe from 'stripe'
import { Heading } from '@chakra-ui/react'
import { DashboardSectionItem } from '@/components/dashboard'

export const BillingSubscription: FC<{
  subscription?: Stripe.Subscription | null
  loading: boolean
}> = ({ subscription, loading }) => {
  return (
    <DashboardSectionItem title='Next Payment' {...{ loading }}>
      <Heading fontSize='1.5em' color='secondary.900'>
        {subscription && subscription.current_period_end
          ? `${new Date(
              subscription.current_period_end * 1_000
            ).toLocaleDateString()}`
          : 'N/A'}
      </Heading>
    </DashboardSectionItem>
  )
}
