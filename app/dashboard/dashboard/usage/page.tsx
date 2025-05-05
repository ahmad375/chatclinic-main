import type { Metadata } from 'next'
import { DashboardUsagePage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Usage'
}

export default function __DashboardUsagePage() {
  return <DashboardUsagePage />
}
