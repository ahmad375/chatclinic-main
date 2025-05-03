'use client'
import type { FC } from 'react'
import { useDashboard } from '@/hooks'
import { DashboardEmptySection } from '@/components/dashboard'
import { EmptyVideosIcon } from '@/components/icons'

export const EmptyVideos: FC = () => {
  const { dispatch } = useDashboard()

  return (
    <DashboardEmptySection
      icon={EmptyVideosIcon}
      title='No Videos'
      description={
        <>
          Add <b>YouTube</b> video URLs that contain useful information for your
          A.I. support agent.
        </>
      }
      action={{
        children: 'New Video',
        onClick() {
          dispatch({
            type: 'SET_NEW_VIDEO_MODAL',
            payload: true
          })
        }
      }}
    />
  )
}
