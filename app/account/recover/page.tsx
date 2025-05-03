import type { Metadata } from 'next'
import { RecoverPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Recover Account'
}

export default function __RecoverPage() {
  return <RecoverPage />
}
