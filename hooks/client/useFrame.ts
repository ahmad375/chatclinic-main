'use client'
import { useContext } from 'react'
import { FrameContext } from '@/contexts'

export const useFrame = () => useContext(FrameContext)
