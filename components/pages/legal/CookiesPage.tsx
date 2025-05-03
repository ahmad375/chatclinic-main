'use client'
import type { FC } from 'react'
import Cookies from '@/legal/cookies.mdx'
import { MDXProvider } from '@/components/providers'
import { LegalHeader } from '@/components/legal'
import { Container } from '@/components/common'

export const CookiesPage: FC = () => {
  return (
    <>
      <LegalHeader lastUpdated='October 31, 2023'>Cookie Policy</LegalHeader>
      <Container maxW='container.lg' py={10}>
        <MDXProvider>
          <Cookies />
        </MDXProvider>
      </Container>
    </>
  )
}
