import type { Metadata } from 'next'
import { ResetPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Reset Password'
}

export default function __ResetPasswordPage() {
  return <ResetPage />
}
