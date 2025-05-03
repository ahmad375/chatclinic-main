import type { Metadata } from 'next'
import { DashboardQuestionBankPage } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Question Bank'
}

export default function __DashboardQuestionBankPage() {
  return <DashboardQuestionBankPage />
}
