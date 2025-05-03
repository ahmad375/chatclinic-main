'use client'
import { type FC, useEffect } from 'react'
import {
  DashboardSectionTitle,
  DashboardToDoList,
  type DashboardToDoListProps
} from '@/components/dashboard'
import { useDashboard } from '@/hooks'

export const DashboardIndexPage: FC<DashboardToDoListProps> = (props) => {
  const { dispatch } = useDashboard()
  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: { selectedTitle: 'Dashboard' }
    })
  }, [])
  return (
    <>
      {/* <DashboardSectionTitle>Dashboard</DashboardSectionTitle> */}
      <DashboardToDoList {...props} />
    </>
  )
}
