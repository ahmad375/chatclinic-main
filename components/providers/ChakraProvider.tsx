'use client'
import type { FC, PropsWithChildren } from 'react'
import { Tinos, Inter } from 'next/font/google'
import { CacheProvider } from '@chakra-ui/next-js'
import {
  ChakraProvider as __ChakraProvider,
  extendTheme
} from '@chakra-ui/react'

const tinos = Tinos({
  subsets: ['latin'],
  weight: ['400']
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500']
})

export const ChakraProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CacheProvider>
      <__ChakraProvider
        theme={extendTheme({
          fonts: {
            heading: tinos.style.fontFamily,
            body: inter.style.fontFamily
          },
          colors: {
            primary: {
              '50': '#e2f3ff',
              '100': '#badfff',
              '200': '#8accff',
              '300': '#50b7ff',
              '400': '#07a6ff',
              '500': '#0096ff',
              '600': '#0087ff',
              '700': '#0173ff',
              '800': '#1761ec',
              '900': '#253dcd'
            },
            // all 600 for checkbox theme
            primaryDark: {
              '50': '#008dff',
              '100': '#008dff',
              '200': '#008dff',
              '300': '#008dff',
              '400': '#008dff',
              '500': '#008dff',
              '600': '#008dff',
              '700': '#008dff',
              '800': '#008dff',
              '900': '#008dff'
            },
            secondary: {
              '50': '#f8fafc',
              '100': '#f1f5f9',
              '200': '#e2e8f0',
              '300': '#cbd5e1',
              '400': '#94a3b8',
              '500': '#64748b',
              '600': '#475569',
              '700': '#334155',
              '800': '#1e293b',
              '900': '#0f172a',
              '950': '#020617'
            },
            customGreen: {
              '50': '#dbf0ff',
              '100': '#b8daf5',
              '200': '#9bbede',
              '300': '#7aa3c6',
              '400': '#618fb4',
              '500': '#477ba2',
              '600': '#396d91',
              '700': '#29597a',
              '800': '#1a4663',
              '900': '#02314b'
            },
            customSlate: {
              '50': '#eaedf0',
              '100': '#cbd2d9',
              '200': '#aab5bf',
              '300': '#8998a5',
              '400': '#708292',
              '500': '#586d80',
              '600': '#4c5f6f',
              '700': '#3d4c5a',
              '800': '#2e3a45',
              '900': '#1d262e'
            }
          }
        })}
      >
        {children}
      </__ChakraProvider>
    </CacheProvider>
  )
}
