'use client'
import type { FC } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Document } from '@/types'
import { FrameDocument } from '.'

export const FrameDocuments: FC<{ documents: Document[] }> = ({
  documents
}) => {
  return (
    <Grid autoFlow='row'>
      {documents.map((document, i) => (
        <GridItem key={`document-${document._id}`}>
          <FrameDocument
            {...{ document }}
            // noBottomBorder={i === documents.length - 1}
            noBottomBorder={false}
          />
        </GridItem>
      ))}
    </Grid>
  )
}
