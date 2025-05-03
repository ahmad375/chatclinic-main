'use client'
import { useEffect, type FC } from 'react'
import { useRouter } from 'next/navigation'
import { useBilling, useDashboard } from '@/hooks'
import { Plan } from '@/enums'
import { DashboardSectionTitle } from '@/components/dashboard'
import {
  BillingPlan,
  BillingSubscription,
  BillingPaymentMethod
} from './billing'

export const DashboardBillingPage: FC = () => {
  const { push } = useRouter()
  const { dispatch } = useDashboard()
  const { fetchBillingInfoLoading, billingInfo } = useBilling()
  const isFree = billingInfo?.plan === Plan.Free
  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Billing'}
    })
  },[])

  return (
    <>
      <DashboardSectionTitle
        secondaryButton={
          fetchBillingInfoLoading
            ? undefined
            : isFree
            ? {
                children: 'View Pricing',
                onClick() {
                  push('https://chatclinicai.com/pricing')
                }
              }
            : undefined
        }
        primaryButton={
          fetchBillingInfoLoading
            ? undefined
            : {
                children: isFree ? 'Upgrade' : 'Cancel Plan',
                bgColor: isFree ? 'primary.700' : 'red.500',
                onClick() {
                  dispatch({
                    type: isFree ? 'SET_SUBSCRIBE_MODAL' : 'SET_CANCEL_MODAL',
                    payload: true
                  })
                }
              }
        }
        primaryButtonLoading={fetchBillingInfoLoading}
        secondaryButtonLoading={fetchBillingInfoLoading}
      >
        {/* Billing */}
      </DashboardSectionTitle>
      <BillingPlan plan={billingInfo?.plan} loading={fetchBillingInfoLoading} />
      <BillingSubscription
        subscription={billingInfo?.subscription}
        loading={fetchBillingInfoLoading}
      />
      <BillingPaymentMethod
        paymentMethod={billingInfo?.paymentMethod}
        loading={fetchBillingInfoLoading}
      />
    </>
  )
}
