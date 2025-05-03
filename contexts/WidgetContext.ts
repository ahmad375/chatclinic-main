'use client'
import { createContext } from 'react'
import { DefaultWidgetState } from '@/lib'
import type { WidgetContext as IWidgetContext } from '@/types'

export const WidgetContext = createContext<IWidgetContext>({
  state: DefaultWidgetState,
  dispatch() {}
})
