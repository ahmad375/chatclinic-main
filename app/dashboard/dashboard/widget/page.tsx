import type { Metadata } from 'next'
import { DashboardWidgetPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Widget'
}

export default function __DashboardeWidgetPage() {
  return <DashboardWidgetPage />
}
