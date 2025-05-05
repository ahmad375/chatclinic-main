import type { Metadata } from 'next'
import { DashboardProfilePage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Profile'
}

export default function __DashboardProfilePage() {
  return <DashboardProfilePage />
}
