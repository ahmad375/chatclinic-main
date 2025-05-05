import type { Metadata } from 'next'
import { DashboardNewQuestionPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'New Question'
}

export default function __DashboardQuestionBankPage() {
  return <DashboardNewQuestionPage />
}
