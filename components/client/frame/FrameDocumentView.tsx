'use client'
import type { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useEditor } from '@tiptap/react'
import { Extensions } from '@/lib'
import { DocumentEditor } from '@/components/common'
import type { Document } from '@/types'

export const FrameDocumentView: FC<{ document: Document }> = ({ document }) => {
  const editor = useEditor({
    extensions: Extensions,
    content: document.content ? JSON.parse(document.content) : '',
    editable: false
  })

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .tiptap-link {
              cursor: pointer;
            }`
        }}
      />
      <Box px={6} py={4} color='black'>
        <Text fontSize='lg' fontWeight={500} lineHeight='150%'>
          {document.title}
        </Text>
        <Text fontSize='md' fontWeight={400} color='secondary.600'>
          {new Date(document.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        <br />
        <DocumentEditor {...{ editor }} readOnly />
      </Box>
    </>
  )
}
