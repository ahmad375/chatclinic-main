'use client'
import type { FC, PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { Container } from '../common'

const Column: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid minWidth='225px' autoFlow='row' alignContent='start' rowGap={4}>
      {children}
    </Grid>
  )
}

const ColumnHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Heading as='h3' fontSize='lg' fontWeight={600} color='customGreen.800'>
      {children}
    </Heading>
  )
}

const ColumnRow: FC<PropsWithChildren<LinkProps & { isActive?: boolean }>> = ({
  children,
  isActive,
  ...props
}) => {
  return (
    <Link {...props} style={{ display: 'inline', cursor: 'default' }}>
      <Text
        display='inline'
        color='customGreen.700'
        fontWeight={400}
        cursor='pointer'
        _hover={{ color: 'customGreen.900' }}
        {...(isActive && {
          textDecor: 'underline',
          pointerEvents: 'none'
        })}
      >
        {children}
      </Text>
    </Link>
  )
}

export const Footer: FC = () => {
  const pathname = usePathname()

  return (
    <footer>
      <Box
        bgColor='customGreen.50'
        pt={{ base: 5, lg: 8 }}
        pb={{ base: 10, lg: 16 }}
      >
        <Container maxW='container.lg'>
          <Flex
            flexDir='row'
            justifyContent='flex-start'
            flexWrap='wrap'
            columnGap={6}
            rowGap={12}
          >
            <Column>
              <ColumnHeader>Product</ColumnHeader>

              <ColumnRow href='/#features'>Features</ColumnRow>
              <ColumnRow href='/pricing' isActive={pathname === '/pricing'}>
                Pricing
              </ColumnRow>
            </Column>
            <Column>
              <ColumnHeader>Platform</ColumnHeader>
              <ColumnRow href='/signup'>Sign Up</ColumnRow>
              <ColumnRow href='/login'>Log In</ColumnRow>
            </Column>
            {/* <Column>
              <ColumnHeader>Business Types</ColumnHeader>
              <ColumnRow href='/business/law'>Law</ColumnRow>
              <ColumnRow href='/business/law'>Healthcare</ColumnRow>
              <ColumnRow href='/business/law'>Agencies</ColumnRow>
              <ColumnRow href='/login'>All</ColumnRow>
            </Column> */}
            <Column>
              <ColumnHeader>Resources</ColumnHeader>
              {/* <ColumnRow href='/guides'>Guides</ColumnRow> */}
              <ColumnRow href='/recover'>Reset Password</ColumnRow>
              <ColumnRow href='mailto:hello@chatclinicai.com'>
                Support
              </ColumnRow>
            </Column>
            <Column>
              <ColumnHeader>Legal</ColumnHeader>
              <ColumnRow
                href='/legal/privacy'
                isActive={pathname === '/legal/privacy'}
              >
                Privacy Policy
              </ColumnRow>
              <ColumnRow
                href='/legal/terms'
                isActive={pathname === '/legal/terms'}
              >
                Terms of Service
              </ColumnRow>
              <ColumnRow
                href='/legal/cookies'
                isActive={pathname === '/legal/cookies'}
              >
                Cookie Policy
              </ColumnRow>
            </Column>
          </Flex>
        </Container>
      </Box>
    </footer>
  )
}
