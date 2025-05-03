'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UnexpectedErrorNotification } from '@/lib'
import type { Page } from '@/types'
import { useAPI, useNotification, useDashboard } from '.'

export const usePages = (): {
  fetchPages: (page: number) => Promise<void>

  newPageLoading: boolean
  newPage: (url: string) => Promise<void>

  deletePageLoading: boolean
  deletePage: (pageId: Page['_id']) => Promise<void>
} => {
  const [newPageLoading, setNewPageLoading] = useState(false)
  const [deletePageLoading, setDeletePageLoading] = useState(false)

  const { push } = useRouter()
  const { dispatch } = useDashboard()
  const { request } = useAPI()
  const { setNotification } = useNotification()

  const fetchPages = async (page: number) => {
    const apiResponse = await request<{
      pages?: Page[]
      totalPages?: number
    }>(`/api/pages?page=${encodeURIComponent(page)}`, {
      withMinimumDelay: true
    })

    if (apiResponse.pages && apiResponse.totalPages !== undefined) {
      dispatch({
        type: 'SET_PAGES',
        payload: {
          pages: apiResponse.pages,
          totalPages: apiResponse.totalPages
        }
      })
    }
  }

  return {
    newPageLoading,
    deletePageLoading,
    fetchPages,
    async newPage(url) {
      try {
        if (newPageLoading) return

        setNewPageLoading(true)

        const apiResponse = await request<{ page?: Page }>('/api/pages/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url }),
          setIsLoading: setNewPageLoading
        })

        if (apiResponse.page) {
          dispatch({
            type: 'SET_NEW_PAGE_MODAL',
            payload: false
          })
          push('/dashboard/pages')
          dispatch({
            type: 'SET_PAGES',
            payload: {
              pages: undefined,
              totalPages: 0
            }
          })
          await fetchPages(1)
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setNewPageLoading(false)
      }
    },
    async deletePage(pageId) {
      try {
        if (deletePageLoading) return

        setDeletePageLoading(true)

        const apiResponse = await request<{ page?: Page }>(
          '/api/pages/delete',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              pageId
            }),
            setIsLoading: setDeletePageLoading
          }
        )

        if (apiResponse.page) {
          push('/dashboard/pages')
          dispatch({
            type: 'SET_PAGES',
            payload: {
              pages: undefined,
              totalPages: 0
            }
          })
          await fetchPages(1)
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setDeletePageLoading(false)
      }
    }
  }
}
