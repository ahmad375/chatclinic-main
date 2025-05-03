'use client'
import { createContext } from 'react'
import { DefaultDashboardState } from '@/lib'
import type { DashboardContext as IDashboardContext } from '@/types'

export const DashboardContext = createContext<IDashboardContext>({
  state: DefaultDashboardState,
  dispatch() {}
})
