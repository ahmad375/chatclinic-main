import type { Metadata } from 'next'
import { PrivacyPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Privacy Policy'
}

export default function PrivacyPolicy() {
  return <PrivacyPage />
}
