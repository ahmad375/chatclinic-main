'use client'
import type { FC } from 'react'
import { useDashboard } from '@/hooks'
import { DashboardEmptySection } from '@/components/dashboard'
import { EmptyPagesIcon } from '@/components/icons'

export const EmptyPages: FC = () => {
  const { dispatch } = useDashboard()

  return (
    <DashboardEmptySection
      icon={EmptyPagesIcon}
      title='No Pages'
      description='Pages are URLs from your website that contain useful information for your A.I. support agent.'
      action={{
        children: 'New Page',
        onClick() {
          dispatch({
            type: 'SET_NEW_PAGE_MODAL',
            payload: true
          })
        }
      }}
    />
  )
}
