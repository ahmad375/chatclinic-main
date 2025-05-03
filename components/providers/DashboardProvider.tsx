'use client'
import {
  useReducer,
  type FC,
  type PropsWithChildren,
  type Reducer
} from 'react'
import { DashboardContext } from '@/contexts'
import { DefaultDashboardState } from '@/lib'
import { dashboardReducer } from '@/reducers'
import type { DashboardState, DashboardAction } from '@/types'

export const DashboardProvider: FC<
  PropsWithChildren<Partial<DashboardState>>
> = ({ children, ...rest }) => {
  const [state, dispatch] = useReducer<
    Reducer<DashboardState, DashboardAction>
  >(dashboardReducer, {
    ...DefaultDashboardState,
    ...rest
  })

  return (
    <DashboardContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
