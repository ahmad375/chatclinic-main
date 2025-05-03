'use client'
import { useEffect, type FC } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Avatar,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  useDisclosure,
  Box,
  Heading,
  Text
} from '@chakra-ui/react'
import { HiMenu } from '@react-icons/all-files/hi/HiMenu'
import { useDashboard } from '@/hooks'
import { Logo } from '@/components/common'
import { DashboardSidebar } from '.'
import { IoIosArrowDown } from "react-icons/io";
export const DashboardHeader: FC = () => {
  const { push } = useRouter()
  const pathname = usePathname()
  const { state, dispatch } = useDashboard()
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    onClose()
  }, [pathname])

  return (
    <>
      <Grid
        pos='sticky'
        top={0}
        templateColumns='0fr 1fr 0fr'
        alignItems='center'
        w='full'
        h={20}
        px={{ base: 4, lg: 4 }}
        bgColor={{ base: 'customGreen.900', lg: 'white' }}
        zIndex={1}
      >
        <GridItem>
          <Grid
            display={{ base: 'grid', lg: 'none' }}
            autoFlow='column'
            justifyContent='start'
            alignItems='center'
            columnGap={3}
          >
            <GridItem>
              <IconButton
                icon={<Icon as={HiMenu} fontSize='lg' />}
                color='white'
                aria-label='Toggle Menu'
                bgColor='customGreen.800'
                _focus={{}}
                _hover={{}}
                _active={{}}
                onClick={onOpen}
                isRound
              />
            </GridItem>
            <GridItem>
              <Logo />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem display={{ base: 'none', lg: 'grid' }}>
          <p style={{fontSize:'20px', fontWeight:'bold'}}>{state.selectedTitle}</p>
        </GridItem>
        <GridItem justifySelf="end">
        <Flex
            align="center"
            width="100%"
            height="55px"
            cursor='pointer'
            overflow="hidden"
            borderColor={ 'gray.200' }
            onClick={() => push('/dashboard/profile')}
              // maxWidth="100%"
          >
            <Avatar
              src="https://ucaf4747c4cda08b31bfa7c702da.dl.dropboxusercontent.com/cd/0/inline/CLjhTrhnxpa3tvGOfGuYGNX-oBLhDqAnYy4bUjDZ77HtR6FDSuMTBlv1pp09gLkCcaMfudOqA7Xw-D9vMavzPJEUsQlS_lZPVklaUX5hltgb4do_XpVkYjIHIluFt_QKELYNGrGvO-A0QRAR4Qv979T0/file#"
              bgColor='purple.400'
              bg={ 'e2ccff' }
              mr="3"
              color='#333333'
              name={state.user.name}
              userSelect='none'
              style={{ width: '42px', height:'42px'}}
            />
            <Box>
              <Heading isTruncated style={{fontSize:'18px'}}>{state.user.name}</Heading>
              <Text style={{fontSize:'13px', color:'#818689'}}>{state.user.email}</Text>
            </Box>
            <IoIosArrowDown style={{marginLeft:5}} />
        </Flex>
        </GridItem>
      </Grid>
      <Drawer {...{ isOpen, onClose }} placement='left' isFullHeight>
        <DrawerOverlay />
        <DrawerContent
          h='full'
          bgColor='customGreen.900'
          overflowY='scroll'
          maxW='275px'
        >
          <DashboardSidebar />
        </DrawerContent>
      </Drawer>
    </>
  )
}
