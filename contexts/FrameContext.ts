'use client'
import { createContext } from 'react'
import { DefaultFrameState } from '@/lib'
import type { FrameContext as IFrameContext } from '@/types'

export const FrameContext = createContext<IFrameContext>({
  state: DefaultFrameState,
  dispatch() {}
})
