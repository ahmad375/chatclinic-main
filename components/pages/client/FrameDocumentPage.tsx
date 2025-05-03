'use client'
import { type FC } from 'react'
import { Frame, FrameDocumentView } from '@/components/client'
import type { Document } from '@/types'

export const FrameDocumentPage: FC<{ document: Document }> = ({ document }) => {
  return (
    <Frame back>
      <FrameDocumentView {...{ document }} />
    </Frame>
  )
}
