'use client'
import { type FC, type CSSProperties } from 'react'
import { EditorContent, Editor } from '@tiptap/react'

export const DocumentEditor: FC<{
  editor: Editor | null
  readOnly?: boolean
}> = ({ editor, readOnly }) => {
  const readOnlyStyles: CSSProperties = {
    fontSize: '16px'
  }
  const editStyles: CSSProperties = {
    fontSize: '18px',
    backgroundColor: 'white',
    padding: readOnly ? '0px' : '12px',
    minHeight: '300px',
    borderRadius: '0px 0px 0.75rem 0.75rem',
    borderLeft: '1px solid #e2e8f0',
    borderRight: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0'
  }

  return (
    <EditorContent
      {...{ editor }}
      style={{
        ...(readOnly ? readOnlyStyles : editStyles)
      }}
    />
  )
}
