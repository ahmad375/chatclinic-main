'use client'
import type { FC } from 'react'
import Link from 'next/link'
import { Td, Tr, Text, Grid, GridItem, Badge, Icon } from '@chakra-ui/react'
import { HiTrash } from '@react-icons/all-files/hi/HiTrash'
import { HiPencil } from '@react-icons/all-files/hi/HiPencil'
import { DefaultDocumentTitle } from '@/lib'
import { useDocuments } from '@/hooks'
import { DashboardTable, DashboardTableLoading } from '@/components/dashboard'
import { SecondaryIconButton } from '@/components/buttons'
import { Tooltip } from '@/components/common'
import type { Document, PaginateProps } from '@/types'

export const DocumentsTable: FC<{
  documents: Document[] | undefined
  paginate: PaginateProps
}> = ({ documents, paginate }) => {
  const title = 'All Documents'
  const columns = ['Title', 'Status', 'Updated', 'Created', 'Actions']
  const sharedProps = { title, columns }

  if (!documents) return <DashboardTableLoading {...sharedProps} />

  return (
    <DashboardTable {...{ paginate }} {...sharedProps}>
      {documents.map((document) => (
        <DocumentRow key={`tr-${document._id}`} {...{ document }} />
      ))}
    </DashboardTable>
  )
}

const DocumentRow: FC<{ document: Document }> = ({ document }) => {
  const { deleteDocument, deleteDocumentLoading } = useDocuments()

  return (
    <Tr>
      <Td>
        <Text>{document.title || DefaultDocumentTitle}</Text>
      </Td>
      <Td>
        <Badge
          variant='subtle'
          colorScheme={document.draft ? 'yellow' : 'green'}
          rounded='full'
          textTransform='uppercase'
          fontSize='xs'
          fontWeight={500}
          px={3}
          py={1}
        >
          {document.draft ? 'Draft' : 'Published'}
        </Badge>
      </Td>
      <Td>
        <Text>{new Date(document.updatedAt).toLocaleDateString()}</Text>
      </Td>
      <Td>
        <Text>{new Date(document.createdAt).toLocaleDateString()}</Text>
      </Td>
      <Td>
        <Grid autoFlow='column' justifyContent='start' columnGap={2}>
          <GridItem>
            <Tooltip label='Delete Document'>
              <SecondaryIconButton
                size='sm'
                icon={<Icon as={HiTrash} />}
                onClick={() => deleteDocument(document._id)}
                isLoading={deleteDocumentLoading}
                aria-label='Delete Document'
              />
            </Tooltip>
          </GridItem>
          <GridItem>
            <Tooltip label='Edit Document'>
              <Link href={`/dashboard/documents/${document._id}`}>
                <SecondaryIconButton
                  size='sm'
                  icon={<Icon as={HiPencil} />}
                  aria-label='Edit Document'
                />
              </Link>
            </Tooltip>
          </GridItem>
        </Grid>
      </Td>
    </Tr>
  )
}
