'use client'
import type { FC } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardEmptySection } from '@/components/dashboard'
import { EmptyQuestionBankIcon } from '@/components/icons'

export const EmptyQuestions: FC = () => {
  const { push } = useRouter()

  return (
    <DashboardEmptySection
      icon={EmptyQuestionBankIcon}
      title='Empty Question Bank'
      description='Think of your Question Bank as your "Frequently Asked Questions". Add question & answer pairs so your A.I. support agent knows how to response to common queries.'
      action={{
        children: 'New Question',
        onClick() {
          push('/dashboard/questions/new')
        }
      }}
    />
  )
}
