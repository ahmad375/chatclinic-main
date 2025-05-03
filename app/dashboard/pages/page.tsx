import type { Metadata } from 'next'
import { DashboardPagesPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Pages'
}

export default function __DashboardPagesPage() {
  return <DashboardPagesPage />
}
