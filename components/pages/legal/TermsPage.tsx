'use client'
import type { FC } from 'react'
import Terms from '@/legal/terms.mdx'
import { MDXProvider } from '@/components/providers'
import { LegalHeader } from '@/components/legal'
import { Container } from '@/components/common'

export const TermsPage: FC = () => {
  return (
    <>
      <LegalHeader lastUpdated='October 31, 2023'>Terms of Service</LegalHeader>
      <Container maxW='container.lg' py={10}>
        <MDXProvider>
          <Terms />
        </MDXProvider>
      </Container>
    </>
  )
}
