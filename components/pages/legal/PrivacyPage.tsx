'use client'
import type { FC } from 'react'
import Privacy from '@/legal/privacy.mdx'
import { MDXProvider } from '@/components/providers'
import { LegalHeader } from '@/components/legal'
import { Container } from '@/components/common'

export const PrivacyPage: FC = () => {
  return (
    <>
      <LegalHeader lastUpdated='October 31, 2023'>Privacy Policy</LegalHeader>
      <Container maxW='container.lg' py={10}>
        <MDXProvider>
          <Privacy />
        </MDXProvider>
      </Container>
    </>
  )
}
