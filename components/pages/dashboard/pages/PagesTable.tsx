'use client'
import type { FC } from 'react'
import { Td, Tr, Text, Icon, Grid, GridItem, Link } from '@chakra-ui/react'
import { HiTrash } from '@react-icons/all-files/hi/HiTrash'
import { usePages } from '@/hooks'
import { Tooltip } from '@/components/common'
import { DashboardTable, DashboardTableLoading } from '@/components/dashboard'
import { SecondaryIconButton } from '@/components/buttons'
import type { Page, PaginateProps } from '@/types'

export const PagesTable: FC<{
  pages: Page[] | undefined
  paginate: PaginateProps
}> = ({ pages, paginate }) => {
  const title = 'All Pages'
  const columns = ['URL', 'Added', 'Actions']
  const sharedProps = { title, columns }

  if (!pages) return <DashboardTableLoading {...sharedProps} />

  return (
    <DashboardTable {...{ paginate }} {...sharedProps}>
      {pages.map((page) => (
        <PageRow key={`tr-${page._id}`} {...{ page }} />
      ))}
    </DashboardTable>
  )
}

const PageRow: FC<{ page: Page }> = ({ page }) => {
  const { deletePage, deletePageLoading } = usePages()

  return (
    <Tr>
      <Td>
        <Text>
          <Link href={page.url} target='_blank' color='primary.700'>
            {page.url}
          </Link>
        </Text>
      </Td>
      <Td>
        <Text>{new Date(page.createdAt).toLocaleDateString()}</Text>
      </Td>
      <Td minW={{ base: '0px', lg: '200px' }}>
        <Grid autoFlow='column' justifyContent='start' columnGap={2}>
          <GridItem>
            <Tooltip label='Remove Page'>
              <SecondaryIconButton
                size='sm'
                icon={<Icon as={HiTrash} />}
                aria-label='Remove Page'
                onClick={() => deletePage(page._id)}
                isLoading={deletePageLoading}
              />
            </Tooltip>
          </GridItem>
        </Grid>
      </Td>
    </Tr>
  )
}
