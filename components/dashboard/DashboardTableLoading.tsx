'use client'
import type { FC, ReactNode } from 'react'
import { Tr, Td, Skeleton } from '@chakra-ui/react'
import { DashboardTable } from '.'

export const DashboardTableLoading: FC<{
  title: string
  columns: ReactNode[]
}> = ({ title, columns }) => {
  return (
    <DashboardTable
      {...{
        title,
        columns,
        paginate: {
          loading: true,
          total: 0,
          current: 0,
          page: 0
        }
      }}
    >
      {new Array(5).fill(0).map((_, i) => (
        <Tr key={`dashboard-loading-row-${i}`}>
          {new Array(columns.length).fill(0).map((_, j) => (
            <Td key={`dashboard-loading-column-${i}-${j}`}>
              <Skeleton w={10} h={4} rounded='full' />
            </Td>
          ))}
        </Tr>
      ))}
    </DashboardTable>
  )
}
