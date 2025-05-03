import type { Metadata } from 'next'
import { CookiesPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Cookie Policy'
}

export default function CookiesPolicy() {
  return <CookiesPage />
}
