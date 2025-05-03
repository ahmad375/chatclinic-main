'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UnexpectedErrorNotification } from '@/lib'
import type { Document, Question } from '@/types'
import { useAPI, useNotification, useDashboard } from '.'

export const useQuestions = (): {
  fetchQuestions: (page: number) => Promise<void>
  fetchQuestion: (questionId: string) => Promise<void>

  newQuestionLoading: boolean
  newQuestion: (
    question: Question['question'],
    answer: Question['answer']
  ) => Promise<void>

  deleteQuestionLoading: boolean
  deleteQuestion: (questionId: Question['_id']) => Promise<void>
} => {
  const [newQuestionLoading, setNewQuestionLoading] = useState(false)
  const [deleteQuestionLoading, setDeleteQuestionLoading] = useState(false)

  const { push } = useRouter()
  const { dispatch } = useDashboard()
  const { request } = useAPI()
  const { setNotification } = useNotification()

  const fetchQuestions = async (page: number) => {
    const apiResponse = await request<{
      questions?: Question[]
      totalQuestions?: number
    }>(`/api/questions?page=${encodeURIComponent(page)}`, {
      withMinimumDelay: true
    })

    if (apiResponse.questions && apiResponse.totalQuestions !== undefined) {
      dispatch({
        type: 'SET_QUESTIONS',
        payload: {
          questions: apiResponse.questions,
          totalQuestions: apiResponse.totalQuestions
        }
      })
    }
  }

  return {
    newQuestionLoading,
    deleteQuestionLoading,
    fetchQuestions,
    async fetchQuestion(questionId) {
      const apiResponse = await request<{ question?: Question | null }>(
        `/api/questions/${questionId}`,
        {
          withMinimumDelay: true
        }
      )

      if (apiResponse.question)
        dispatch({
          type: 'SET_QUESTION',
          payload: apiResponse.question
        })
    },
    async newQuestion(question, answer) {
      try {
        if (newQuestionLoading) return

        setNewQuestionLoading(true)

        await request<{ document?: Document }>('/api/questions/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question, answer }),
          setIsLoading: setNewQuestionLoading
        })
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setNewQuestionLoading(false)
      }
    },
    async deleteQuestion(questionId) {
      try {
        if (deleteQuestionLoading) return

        setDeleteQuestionLoading(true)

        const apiResponse = await request<{ question?: Question }>(
          '/api/questions/delete',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              questionId
            }),
            setIsLoading: setDeleteQuestionLoading
          }
        )

        if (apiResponse.question) {
          push('/dashboard/questions')
          dispatch({
            type: 'SET_QUESTIONS',
            payload: {
              questions: undefined,
              totalQuestions: 0
            }
          })
          // just always naviagte to the first page
          await fetchQuestions(1)
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setDeleteQuestionLoading(false)
      }
    }
  }
}
