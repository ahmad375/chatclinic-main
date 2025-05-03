'use client'
import { type FC } from 'react'
import { Text } from '@chakra-ui/react'
import { Frame, FrameEmptyDocuments, FrameDocuments } from '@/components/client'
import type { Document } from '@/types'

export const FrameDocumentsPage: FC<{ documents: Document[] }> = ({
  documents
}) => {
  return (
    <Frame
      title={
        <Text fontSize='xl' fontWeight={500}>
          Help
        </Text>
      }
    >
      {documents.length === 0 && <FrameEmptyDocuments />}
      {documents.length > 0 && <FrameDocuments {...{ documents }} />}
    </Frame>
  )
}
