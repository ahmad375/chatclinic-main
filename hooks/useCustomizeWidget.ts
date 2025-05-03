'use client'
import { useState } from 'react'
import { UnexpectedErrorNotification } from '@/lib'
import type { User, WidgetTheme } from '@/types'
import { useNotification, useAPI, useDashboard } from '.'

export const useCustomizeWidget = (): {
  updateWidgetThemeLoading: boolean
  updateWidgetTheme: (widgetTheme: WidgetTheme) => Promise<void>
  updateWidgetDefaultMessageLoading: boolean
  updateWidgetDefaultMessage: (defaultMessage: string) => Promise<void>
} => {
  const [
    updateWidgetDefaultMessageLoading,
    setUpdateWidgetDefaultMessageLoading
  ] = useState(false)
  const [updateWidgetThemeLoading, setUpdateWidgetThemeLoading] =
    useState(false)
  const { dispatch } = useDashboard()
  const { setNotification } = useNotification()
  const { request } = useAPI()

  return {
    updateWidgetThemeLoading,
    updateWidgetDefaultMessageLoading,
    async updateWidgetTheme(widgetTheme) {
      try {
        setUpdateWidgetThemeLoading(true)

        const apiResponse = await request<{ user?: User }>(
          '/api/user/widget/updateTheme',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              widgetTheme
            })
          }
        )

        if (apiResponse.user)
          dispatch({
            type: 'UPDATE_USER',
            payload: apiResponse.user
          })
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setUpdateWidgetThemeLoading(false)
      }
    },
    async updateWidgetDefaultMessage(defaultMessage) {
      try {
        setUpdateWidgetDefaultMessageLoading(true)

        const apiResponse = await request<{ user?: User }>(
          '/api/user/widget/updateDefaultMessage',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              defaultMessage
            })
          }
        )

        if (apiResponse.user)
          dispatch({
            type: 'UPDATE_USER',
            payload: apiResponse.user
          })
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setUpdateWidgetDefaultMessageLoading(false)
      }
    }
  }
}
