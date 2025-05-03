'use client'
import type { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import { pluralize, toTitleCase } from '@/lib'
import { DashboardSectionItem } from '@/components/dashboard'

export const UsageStat: FC<{
  unit: string
  total?: number
  limit?: number | string
}> = ({ unit, total, limit }) => {
  const loading = total === undefined || limit === undefined
  const limitIsNumber = typeof limit === 'number'

  return (
    <DashboardSectionItem title={`${toTitleCase(unit)} Usage`} {...{ loading }}>
      <Heading fontSize='1.5em' color='secondary.900'>
        {!loading && (
          <>
            {total.toLocaleString()} /{' '}
            {limitIsNumber ? limit.toLocaleString() : limit}{' '}
            {/* Pluralize for string limit (infinity) */}
            {pluralize(limitIsNumber ? limit : 2, unit)}
          </>
        )}
      </Heading>
    </DashboardSectionItem>
  )
}
