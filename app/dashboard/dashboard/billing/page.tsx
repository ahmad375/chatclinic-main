import type { Metadata } from 'next'
import { DashboardBillingPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Billing'
}

export default function __DashboardBillingPage() {
  return <DashboardBillingPage />
}
