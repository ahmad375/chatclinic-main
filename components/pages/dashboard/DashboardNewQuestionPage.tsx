'use client'
import { useState, type FC } from 'react'
import { useQuestions } from '@/hooks'
import { DashboardSectionTitle } from '@/components/dashboard'
import { QuestionPortal } from './questions'

export const DashboardNewQuestionPage: FC = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const { newQuestion, newQuestionLoading } = useQuestions()

  return (
    <>
      <DashboardSectionTitle
        back={{
          children: 'Question Bank',
          path: '/dashboard/questions'
        }}
        primaryButton={{
          children: 'Add Question',
          onClick: () => {
            newQuestion(question, answer)
          },
          isLoading: newQuestionLoading
        }}
      >
        New Question
      </DashboardSectionTitle>
      <QuestionPortal {...{ question, setQuestion, answer, setAnswer }} />
    </>
  )
}
