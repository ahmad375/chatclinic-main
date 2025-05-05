import type { Metadata } from 'next'
import { DashboardMessagesPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Messages'
}

export default function __DashboardMessagesPage() {
  return <DashboardMessagesPage />
}
