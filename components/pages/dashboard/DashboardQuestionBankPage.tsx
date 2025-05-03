'use client'
import { useEffect, type FC } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboard, useQuestions, usePaginate } from '@/hooks'
import { DashboardSectionTitle } from '@/components/dashboard'
import { EmptyQuestions, QuestionsTable } from './questions'

export const DashboardQuestionBankPage: FC = () => {
  const { push } = useRouter()
  const {
    dispatch,
    state: { questions, totalQuestions }
  } = useDashboard()
  const { fetchQuestions } = useQuestions()
  const { page } = usePaginate()

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Question Bank'}
    })
  },[])

  useEffect(() => {
    fetchQuestions(page)
  }, [page])

  useEffect(() => {
    dispatch({
      type: 'SET_QUESTIONS',
      payload: {
        questions: undefined,
        totalQuestions: 0
      }
    })
  }, [page])

  return (
    <>
      <DashboardSectionTitle
        primaryButton={{
          children: 'New Question',
          onClick() {
            push('/dashboard/questions/new')
          }
        }}
      >
        Question Bank
      </DashboardSectionTitle>
      {questions && questions.length === 0 && <EmptyQuestions />}
      {(!questions || questions.length > 0) && (
        <QuestionsTable
          {...{
            questions,
            paginate: {
              total: totalQuestions,
              current: questions ? questions.length : 0,
              page
            }
          }}
        />
      )}
    </>
  )
}
