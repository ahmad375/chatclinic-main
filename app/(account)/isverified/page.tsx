import type { Metadata } from 'next'
import { IsVerifiedPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Is Verified?...'
}

export default function __IsVerifiedPage() {
  return <IsVerifiedPage />
}
