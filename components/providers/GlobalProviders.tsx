'use client'
import type { FC, PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from './ChakraProvider'

export const GlobalProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  )
}
