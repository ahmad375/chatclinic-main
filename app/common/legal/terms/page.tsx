import type { Metadata } from 'next'
import { TermsPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Terms of Service'
}

export default function TermsOfService() {
  return <TermsPage />
}
