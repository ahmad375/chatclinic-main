'use client'
import type { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import { Plan } from '@/enums'
import { DashboardSectionItem } from '@/components/dashboard'

export const BillingPlan: FC<{ plan?: Plan | null; loading: boolean }> = ({
  plan,
  loading
}) => {
  return (
    <DashboardSectionItem title='Plan' {...{ loading }}>
      <Heading fontSize='1.5em' color='secondary.900'>
        {plan || Plan.Free}
      </Heading>
    </DashboardSectionItem>
  )
}
