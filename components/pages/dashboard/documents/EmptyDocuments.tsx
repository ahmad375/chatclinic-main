'use client'
import type { FC } from 'react'
import { useDocuments } from '@/hooks'
import { DashboardEmptySection } from '@/components/dashboard'
import { EmptyDocumentsIcon } from '@/components/icons'

interface EmptyDocumentsProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const EmptyDocuments: FC<EmptyDocumentsProps> = ({setIsOpen}) => {
  const { newDocument, newDocumentLoading } = useDocuments()

  return (
    <DashboardEmptySection
      icon={EmptyDocumentsIcon}
      title='No Support Documents'
      description='Support documents are publicly available to your users. Your A.I. support agent will also reference them when needed.'
      action={{
        children: 'New Document',
        onClick: ()=> setIsOpen(true),
        isLoading: newDocumentLoading
      }}
    />
  )
}
