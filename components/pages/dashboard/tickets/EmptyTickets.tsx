'use client'
import type { FC } from 'react'
import { DashboardEmptySection } from '@/components/dashboard'
import { EmptyTicketsIcon } from '@/components/icons'

export const EmptyTickets: FC = () => {
  return (
    <DashboardEmptySection
      icon={EmptyTicketsIcon}
      title='No Support Tickets'
      description='Support requests from your users will show up here. Your A.I. support agent submits these tickets on your behalf.'
    />
  )
}
