'use client'
import { useContext } from 'react'
import { WidgetContext } from '@/contexts'

export const useWidget = () => useContext(WidgetContext)
