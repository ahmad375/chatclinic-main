'use client'
import {
  useReducer,
  type FC,
  type PropsWithChildren,
  type Reducer
} from 'react'
import { FrameContext } from '@/contexts'
import { DefaultFrameState } from '@/lib'
import { frameReducer } from '@/reducers'
import type { FrameState, FrameAction } from '@/types'

export const FrameProvider: FC<PropsWithChildren<Partial<FrameState>>> = ({
  children,
  ...rest
}) => {
  const [state, dispatch] = useReducer<Reducer<FrameState, FrameAction>>(
    frameReducer,
    {
      ...DefaultFrameState,
      ...rest
    }
  )

  return (
    <FrameContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </FrameContext.Provider>
  )
}
