import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Plan } from '@/enums'
import type { APIResponse, BillingInfo } from '@/types'
import { useAPI } from '.'

export const useBilling = (): {
  subscribe: (
    plan: Plan,
    paymentMethodId: string
  ) => Promise<APIResponse | undefined>
  subscribe_new_user: (
    name: string,
    email: string,
    plan: Plan,
    paymentMethodId: string
  ) => Promise<APIResponse<{customerId?: string, password?: string}> | undefined>
  subscribeLoading: boolean
  cancel: () => Promise<APIResponse | undefined>
  cancelLoading: boolean
  fetchBillingInfoLoading: boolean
  fetchBillingInfo: () => Promise<void>
  billingInfo: BillingInfo | undefined
} => {
  const [subscribeLoading, setSubscribeLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [fetchBillingInfoLoading, setFetchBillingInfoLoading] = useState(true)
  const [billingInfo, setBillingInfo] = useState<BillingInfo | undefined>(
    undefined
  )
  const { request } = useAPI()
  const pathname = usePathname()

  const fetchBillingInfo = async (): Promise<void> => {
    const apiResponse = await request<BillingInfo>('/api/billing/info', {
      method: 'GET',
      setIsLoading: setFetchBillingInfoLoading,
      withMinimumDelay: true
    })
    if (apiResponse.success)
      setBillingInfo({
        plan: apiResponse.plan,
        subscription: apiResponse.subscription,
        paymentMethod: apiResponse.paymentMethod
      })
  }

  useEffect(() => {
    console.log('=====pathName: ========', pathname)
    if(pathname !== "/pricing")
      fetchBillingInfo()
  }, [pathname])

  return {
    subscribeLoading,
    cancelLoading,
    fetchBillingInfoLoading,
    async cancel() {
      if (cancelLoading) return undefined
      const apiResponse = await request('/api/billing/cancel', {
        method: 'POST',
        body: JSON.stringify({}),
        setIsLoading: setCancelLoading,
        withMinimumDelay: false
      })
      return apiResponse
    },
    async subscribe(plan, paymentMethodId) {
      if (subscribeLoading) return undefined
      const apiResponse = await request('/api/billing/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          plan,
          paymentMethodId
        }),
        setIsLoading: setSubscribeLoading,
        withMinimumDelay: false
      })
      return apiResponse
    },
    async subscribe_new_user(name, email, plan, paymentMethodId) {
      if (subscribeLoading) return undefined
      const apiResponse = await request<{customerId?:string}>('/api/billing/subscribe/new_user', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          plan,
          paymentMethodId
        }),
        setIsLoading: setSubscribeLoading,
        withMinimumDelay: false
      })
      return apiResponse
    },
    billingInfo,
    fetchBillingInfo
  }
}
