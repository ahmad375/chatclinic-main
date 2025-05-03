'use client'
import type { FC } from 'react'
import { NewPageModal } from './NewPageModal'
import { NewVideoModal } from './NewVideoModal'
import { SubscribeModal } from './SubscribeModal'
import { CancelModal } from './CancelModal'

export const DashboardModals: FC = () => {
  return (
    <>
      <NewPageModal />
      <NewVideoModal />
      <SubscribeModal />
      <CancelModal />
    </>
  )
}
