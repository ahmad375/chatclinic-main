'use client'
import type { FC, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Box,
  HStack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Stack,
  ButtonGroup,
  Skeleton
} from '@chakra-ui/react'
import { PageLimit } from '@/lib'
import type { PaginateProps } from '@/types'
import { PrimaryButton, SecondaryButton } from '../buttons'

interface DashboardTableProps extends DashboardTablePartialProps {
  title: string
  paginate: {
    loading?: boolean
  } & PaginateProps
}

export const DashboardTable: FC<DashboardTableProps> = ({
  title,
  paginate,
  ...partialProps
}) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const previousDisabled = paginate.page === 1
  const nextDisabled = paginate.page >= paginate.total / PageLimit

  return (
    <Box pt={6}>
      <Box bgColor='white' rounded='xl' shadow='base'>
        <Stack spacing='5'>
          <Box px={{ base: '4', md: '6' }} pt='5'>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justify='space-between'
            >
              <Text textStyle='lg' fontWeight={500}>
                {title}
              </Text>
            </Stack>
          </Box>
          <Box overflowX='auto'>
            <DashboardTablePartial {...partialProps} />
          </Box>
          <Box px={{ base: '4', md: '6' }} pb='5'>
            <HStack spacing='3' justify='space-between'>
              {paginate.loading && (
                <Skeleton w='full' maxW={24} h={4} rounded='lg' />
              )}
              {!paginate.loading && (
                <Text
                  display={{ base: 'none', lg: 'inline-block' }}
                  color='secondary.600'
                  textStyle='sm'
                >
                  Showing {(paginate.page - 1) * PageLimit + 1} to{' '}
                  {(paginate.page - 1) * PageLimit + paginate.current} of{' '}
                  {paginate.total} result
                  {paginate.total === 1 ? '' : 's'}
                </Text>
              )}
              <ButtonGroup
                spacing='3'
                justifyContent='flex-end'
                width={{ base: 'full', md: 'auto' }}
                variant='secondary'
              >
                {paginate.loading && (
                  <>
                    <Skeleton w={16} h={10} rounded='lg' />
                    <Skeleton w={16} h={10} rounded='lg' />
                  </>
                )}
                {!paginate.loading && (
                  <>
                    <SecondaryButton
                      rounded='lg'
                      isDisabled={previousDisabled}
                      onClick={() => {
                        const previousPage = paginate.page - 1
                        if (previousPage === 1) {
                          push(pathname)
                        } else {
                          push(`${pathname}?p=${previousPage}`)
                        }
                      }}
                    >
                      Back
                    </SecondaryButton>
                    <PrimaryButton
                      rounded='lg'
                      isDisabled={nextDisabled}
                      onClick={() => {
                        const nextPage = paginate.page + 1
                        push(`${pathname}?p=${nextPage}`)
                      }}
                    >
                      Next
                    </PrimaryButton>
                  </>
                )}
              </ButtonGroup>
            </HStack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

interface DashboardTablePartialProps {
  columns: ReactNode[]
  children?: ReactNode
}

const DashboardTablePartial: FC<DashboardTablePartialProps> = ({
  columns,
  children
}) => {
  return (
    <Table variant='simple'>
      <Thead>
        <Tr>
          {columns.map((column, i) => (
            <Th key={`dashboard-table-header-${i}`}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody color='black'>{children}</Tbody>
    </Table>
  )
}
