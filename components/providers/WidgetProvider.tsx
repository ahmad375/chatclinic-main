'use client'
import {
  useReducer,
  type FC,
  type PropsWithChildren,
  type Reducer
} from 'react'
import { WidgetContext } from '@/contexts'
import { DefaultWidgetState } from '@/lib'
import { widgetReducer } from '@/reducers'
import type { WidgetState, WidgetAction } from '@/types'

export const WidgetProvider: FC<PropsWithChildren<Partial<WidgetState>>> = ({
  children,
  ...rest
}) => {
  const [state, dispatch] = useReducer<Reducer<WidgetState, WidgetAction>>(
    widgetReducer,
    {
      ...DefaultWidgetState,
      ...rest
    }
  )

  return (
    <WidgetContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </WidgetContext.Provider>
  )
}
