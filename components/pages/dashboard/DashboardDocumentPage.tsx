'use client'
import { useEffect, type FC } from 'react'
import { Icon } from '@chakra-ui/react'
import { HiRefresh } from '@react-icons/all-files/hi/HiRefresh'
import { DefaultDocumentTitle, SiteConfig } from '@/lib'
import { useDashboard, useDocuments } from '@/hooks'
import {
  DashboardSectionTitle,
  DashboardSectionLoading
} from '@/components/dashboard'
import { DocumentPortal } from './documents'

var timeout: NodeJS.Timeout | undefined

export const DashboardDocumentPage: FC<{ documentId: string }> = ({
  documentId
}) => {
  const {
    state: { document },
    dispatch
  } = useDashboard()
  const {
    fetchDocument,
    updateDocument,
    updateDocumentLoading,
    publishDocument,
    publishDocumentLoading
  } = useDocuments()

  useEffect(() => {
    fetchDocument(documentId)

    return () =>
      dispatch({
        type: 'SET_DOCUMENT',
        payload: undefined
      })
  }, [])

  useEffect(() => {
    if (document) {
      window.document.title = `${document.title || DefaultDocumentTitle} - ${
        SiteConfig.baseTitle
      }`
      if (document.draft) {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          updateDocument(documentId, document)
        }, 1000)
        return () => {
          if (timeout) clearTimeout(timeout)
        }
      }
    }
  }, [document])

  if (!document)
    return <DashboardSectionLoading primaryButton secondaryButton />

  return (
    <>
      <DashboardSectionTitle
        back={{
          path: '/dashboard/documents',
          children: 'Documents'
        }}
        secondaryButton={
          document.draft
            ? {
                children: 'Save',
                isLoading: updateDocumentLoading,
                onClick() {
                  updateDocument(documentId, document)
                }
              }
            : undefined
        }
        primaryButton={{
          leftIcon: document.draft ? undefined : <Icon as={HiRefresh} />,
          children: document.draft ? 'Publish' : 'Republish',
          isLoading: publishDocumentLoading,
          onClick() {
            publishDocument(documentId, document)
          }
        }}
      >
        {document.title || DefaultDocumentTitle}
      </DashboardSectionTitle>
      <DocumentPortal {...{ document }} />
    </>
  )
}
