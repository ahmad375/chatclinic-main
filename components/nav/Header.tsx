'use client'
import { useEffect, type FC } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Box,
  Flex,
  Container,
  Grid,
  GridItem,
  Icon,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody
} from '@chakra-ui/react'
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight'
import { HiMenu } from '@react-icons/all-files/hi/HiMenu'
import { HiX } from '@react-icons/all-files/hi/HiX'
import { GhostButton, PrimaryButton, SecondaryButton } from '../buttons'
import { Logo } from '../common'

export const Header: FC<{ isTransparent?: boolean, isLoggedInUser?:boolean }> = ({ isTransparent, isLoggedInUser }) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

  useEffect(() => {
    onClose()
  }, [pathname])

  return (
    <nav>
      <Box h={20} bgColor={isTransparent ? 'transparent' : 'white'}>
        <Container maxW='container.xl' h='full'>
          <Flex
            pos='relative'
            h='full'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box zIndex={1}>
              <Logo w={{ base: 32 }} />
            </Box>
            <Grid
              display={{ base: 'none', md: 'grid' }}
              pos='absolute'
              w='full'
              autoFlow='column'
              justifyContent='center'
              zIndex={0}
            >
              {/* <GridItem>
                <Link href='/guides'>
                  <GhostButton rounded='lg'>Guides</GhostButton>
                </Link>
              </GridItem> */}
              <GridItem>
                <Link href='/#features'>
                  <GhostButton rounded='lg'>Features</GhostButton>
                </Link>
              </GridItem>
              <GridItem>
                <Link href='/pricing'>
                  <GhostButton
                    rounded='lg'
                    {...(pathname === '/pricing' && {
                      opacity: 0.5,
                      pointerEvents: 'none'
                    })}
                  >
                    Pricing
                  </GhostButton>
                </Link>
              </GridItem>
            </Grid>
            <Grid
              display={{ base: 'none', md: 'grid' }}
              autoFlow='column'
              zIndex={1}
            >
              {!isLoggedInUser && 
                <GridItem px={4}>
                  <Link href='/login'>
                    <SecondaryButton
                      color={isTransparent ? 'white' : 'primary.700'}
                      borderColor={isTransparent ? 'white' : 'primary.700'}
                      rounded='lg'
                    >
                      Log In
                    </SecondaryButton>
                  </Link>
                </GridItem>
              }
              <GridItem>
                <Link href={isLoggedInUser? '/dashboard': '/signup'}>
                  <PrimaryButton
                    rounded='lg'
                    rightIcon={<Icon as={FiArrowRight} />}
                  >
                    {isLoggedInUser? 'Dashboard': 'Get Started'}
                  </PrimaryButton>
                </Link>
              </GridItem>
            </Grid>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<Icon as={HiMenu} fontSize='lg' />}
              color='white'
              bgColor='whiteAlpha.200'
              onClick={onOpen}
              _hover={{ bgColor: 'whiteAlpha.300' }}
              _active={{ bgColor: 'whiteAlpha.200' }}
              aria-label='Toggle Menu'
              isRound
            />
          </Flex>
        </Container>
      </Box>
      <Drawer {...{ isOpen, onClose }} placement='right' isFullHeight>
        <DrawerOverlay />
        <DrawerContent bgColor='customGreen.900'>
          <Flex justifyContent='flex-end' alignItems='center' h={20} px={4}>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<Icon as={HiX} fontSize='lg' />}
              color='white'
              bgColor='whiteAlpha.200'
              onClick={onClose}
              _hover={{ bgColor: 'whiteAlpha.300' }}
              _active={{ bgColor: 'whiteAlpha.200' }}
              aria-label='Toggle Menu'
              isRound
            />
          </Flex>
          <DrawerBody>
            <Grid autoFlow='row' rowGap={3}>
              {/* <GridItem>
                <GhostButton
                  w='full'
                  onClick={() => push('/pricing')}
                  border='1.5px solid var(--chakra-colors-whiteAlpha-200)'
                >
                  Guides
                </GhostButton>
              </GridItem> */}
              <GridItem>
                <GhostButton
                  w='full'
                  onClick={() => push('/#features')}
                  border='1.5px solid var(--chakra-colors-whiteAlpha-200)'
                >
                  Features
                </GhostButton>
              </GridItem>
              <GridItem>
                <GhostButton
                  w='full'
                  onClick={() => push('/pricing')}
                  border='1.5px solid var(--chakra-colors-whiteAlpha-200)'
                >
                  Pricing
                </GhostButton>
              </GridItem>
              <GridItem>
                <SecondaryButton
                  w='full'
                  color='white'
                  borderColor='white'
                  onClick={() => push('/login')}
                >
                  Log In
                </SecondaryButton>
              </GridItem>
              <GridItem>
                <PrimaryButton w='full' onClick={() => push('/login')}>
                  Sign Up
                </PrimaryButton>
              </GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}
