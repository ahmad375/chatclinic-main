'use client'
import type { FC, PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'
import { Footer, PostFooter, Banner, CallToAction } from '../nav'

export const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box pos='relative'>
      <Banner />
      <main>{children}</main>
      <CallToAction />
      <Footer />
      <PostFooter />
    </Box>
  )
}
