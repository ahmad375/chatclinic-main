'use client'
import { type FC, useEffect } from 'react'
import { DashboardSectionTitle } from '@/components/dashboard'
import { WidgetTheme, WidgetInstallation, WidgetDefaultMessage } from './widget'
import { useDashboard } from '@/hooks'

export const DashboardWidgetPage: FC = () => {

  const {dispatch} = useDashboard()

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Widget'}
    })
  },[])
  return (
    <>
      {/* <DashboardSectionTitle>Widget</DashboardSectionTitle> */}
      <WidgetInstallation />
      <WidgetTheme />
      <WidgetDefaultMessage />
    </>
  )
}
