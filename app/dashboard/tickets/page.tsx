import type { Metadata } from 'next'
import { DashboardTicketsPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Tickets'
}

export default function __DashboardTicketsPage() {
  return <DashboardTicketsPage />
}
