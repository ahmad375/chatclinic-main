'use client'
import type { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import { useDashboard } from '@/hooks'
import { DashboardSectionItem } from '@/components/dashboard'

export const ProfileEmail: FC = () => {
  const {
    state: { user }
  } = useDashboard()

  return (
    <DashboardSectionItem title='Email'>
      <Heading fontSize='1.5em' color='secondary.900'>
        {user.email}
      </Heading>
    </DashboardSectionItem>
  )
}
