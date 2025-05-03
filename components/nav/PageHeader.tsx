'use client'
import type { FC } from 'react'
import { Box, Heading, type BoxProps } from '@chakra-ui/react'
import { Container } from '@/components/common'
import { Header } from './Header'

interface PageHeaderProps extends BoxProps {
  children: React.ReactNode
  isLoggedInUser: boolean
}

export const PageHeader: FC<PageHeaderProps> = ({ children, isLoggedInUser, ...props }) => {
  return (
    <Box className='pattern' {...props}>
      <Header isTransparent {...{isLoggedInUser}} />
      <section>
        <Box py={{ base: 10, lg: 16 }} textAlign='center' color='white'>
          <Container>
            <Heading size='2xl'>{children}</Heading>
          </Container>
        </Box>
      </section>
    </Box>
  )
}
