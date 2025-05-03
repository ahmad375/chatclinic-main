'use client'
import { createContext } from 'react'
import { DefaultDashboardState } from '@/lib'
import type { HomeContext as IHomeContext } from '@/types'

export const HomeContext = createContext<IHomeContext>({
  state: DefaultDashboardState,
  dispatch() {}
})
