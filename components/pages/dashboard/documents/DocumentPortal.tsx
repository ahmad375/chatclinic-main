'use client'
import { type FC } from 'react'
import { FormControl, FormLabel, Grid, GridItem } from '@chakra-ui/react'
import { useEditor } from '@tiptap/react'
import { useDashboard } from '@/hooks'
import { Extensions } from '@/lib'
import {
  CustomInput,
  DocumentEditor,
  DocumentEditorToolbar
} from '@/components/common'
import type { Document } from '@/types'

export const DocumentPortal: FC<{ document: Document }> = ({ document }) => {
  const { dispatch } = useDashboard()
  const editor = useEditor({
    extensions: Extensions,
    content: document.content ? JSON.parse(document.content) : '',
    onUpdate({ editor }) {
      dispatch({
        type: 'UPDATE_DOCUMENT',
        payload: {
          content: JSON.stringify(editor.getJSON()),
          plainContent: editor.state.doc.textContent
        }
      })
    }
  })

  return (
    <Grid autoFlow='row' rowGap={6} py={6}>
      <GridItem>
        <FormControl isRequired>
          <FormLabel pb={2}>Document Title</FormLabel>
          <CustomInput
            size='lg'
            rounded='xl'
            placeholder='Document Title'
            value={document.title}
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              const value = input.value
              dispatch({
                type: 'UPDATE_DOCUMENT',
                payload: {
                  title: value
                }
              })
            }}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl isRequired>
          <FormLabel pb={2}>Document Subtitle</FormLabel>
          <CustomInput
            size='lg'
            rounded='xl'
            placeholder='Document Subtitle'
            value={document.subtitle}
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              const value = input.value
              dispatch({
                type: 'UPDATE_DOCUMENT',
                payload: {
                  subtitle: value
                }
              })
            }}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl isRequired>
          <FormLabel pb={2}>Document Content</FormLabel>
          <Grid autoFlow='row'>
            <GridItem>
              <DocumentEditorToolbar {...{ editor }} />
            </GridItem>
            <GridItem>
              <DocumentEditor {...{ editor }} />
            </GridItem>
          </Grid>
        </FormControl>
      </GridItem>
    </Grid>
  )
}
