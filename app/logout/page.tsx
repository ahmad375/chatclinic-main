import type { Metadata } from 'next'
import { LogOutPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Logging out...'
}

export default function __LogOutPage() {
  return <LogOutPage />
}
