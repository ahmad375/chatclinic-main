'use client'
import { useContext } from 'react'
import { DashboardContext } from '@/contexts'

export const useDashboard = () => useContext(DashboardContext)
