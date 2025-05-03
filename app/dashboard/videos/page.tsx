import type { Metadata } from 'next'
import { DashboardVideosPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Videos'
}

export default function __DashboardVideosPage() {
  return <DashboardVideosPage />
}
