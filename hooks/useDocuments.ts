'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UnexpectedErrorNotification } from '@/lib'
import type { Document } from '@/types'
import { useAPI, useNotification, useDashboard } from '.'

export const useDocuments = (): {
  fetchDocuments: (page: number) => Promise<void>
  fetchDocument: (documentId: string) => Promise<void>

  newDocumentLoading: boolean
  newDocument: (pdfContent?: string) => Promise<void>

  deleteDocumentLoading: boolean
  deleteDocument: (documentId: Document['_id']) => Promise<void>

  updateDocumentLoading: boolean
  updateDocument: (
    documentId: string,
    documentPartial: Pick<Document, 'title' | 'subtitle' | 'content'>
  ) => Promise<void>

  publishDocumentLoading: boolean
  publishDocument: (
    documentId: string,
    documentPartial: Pick<Document, 'title' | 'subtitle' | 'content'>
  ) => Promise<void>
} => {
  const [newDocumentLoading, setNewDocumentLoading] = useState(false)
  const [deleteDocumentLoading, setDeleteDocumentLoading] = useState(false)
  const [updateDocumentLoading, setUpdateDocumentLoading] = useState(false)
  const [publishDocumentLoading, setPublishDocumentLoading] = useState(false)

  const { push } = useRouter()
  const { dispatch } = useDashboard()
  const { request } = useAPI()
  const { setNotification } = useNotification()

  const fetchDocuments = async (page: number) => {
    const apiResponse = await request<{
      documents?: Document[]
      totalDocuments?: number
    }>(`/api/documents?page=${encodeURIComponent(page)}`, {
      withMinimumDelay: true
    })

    if (apiResponse.documents && apiResponse.totalDocuments !== undefined) {
      dispatch({
        type: 'SET_DOCUMENTS',
        payload: {
          documents: apiResponse.documents,
          totalDocuments: apiResponse.totalDocuments
        }
      })
    }
  }

  return {
    newDocumentLoading,
    deleteDocumentLoading,
    updateDocumentLoading,
    publishDocumentLoading,
    fetchDocuments,
    async fetchDocument(documentId) {
      const apiResponse = await request<{ document?: Document | null }>(
        `/api/documents/${documentId}`,
        {
          withMinimumDelay: true
        }
      )

      if (apiResponse.document)
        dispatch({
          type: 'SET_DOCUMENT',
          payload: apiResponse.document
        })
    },
    async newDocument(pdfContent?) {
      try {
        if (newDocumentLoading) return

        setNewDocumentLoading(true)

        const apiResponse = await request<{ document?: Document }>(
          '/api/documents/new',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: pdfContent ? JSON.stringify({ pdfContent}) : JSON.stringify({}),
            setIsLoading: setNewDocumentLoading
          }
        )

        if (apiResponse.document) {
          // wait for redirect before adding
          await new Promise((r) => setTimeout(r, 1500))
          dispatch({ type: 'ADD_DOCUMENT', payload: apiResponse.document })
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setNewDocumentLoading(false)
      }
    },
    async deleteDocument(documentId) {
      try {
        if (deleteDocumentLoading) return

        setDeleteDocumentLoading(true)

        const apiResponse = await request<{ document?: Document }>(
          '/api/documents/delete',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              documentId
            }),
            setIsLoading: setDeleteDocumentLoading
          }
        )

        if (apiResponse.document) {
          push('/dashboard/documents')
          dispatch({
            type: 'SET_DOCUMENTS',
            payload: {
              documents: undefined,
              totalDocuments: 0
            }
          })
          // just always naviagte to the first page
          await fetchDocuments(1)
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setDeleteDocumentLoading(false)
      }
    },
    async updateDocument(documentId, documentPartial) {
      try {
        setUpdateDocumentLoading(true)

        await request(`/api/documents/${documentId}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(documentPartial)
        })
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setUpdateDocumentLoading(false)
      }
    },
    async publishDocument(documentId, documentPartial) {
      try {
        setPublishDocumentLoading(true)

        await request(`/api/documents/${documentId}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...documentPartial,
            draft: false
          })
        })
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setPublishDocumentLoading(false)
      }
    }
  }
}
