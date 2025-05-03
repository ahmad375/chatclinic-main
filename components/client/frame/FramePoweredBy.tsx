'use client'
import type { FC } from 'react'
import { Box, Text, Link, Image, Flex } from '@chakra-ui/react'
import { useFrame } from '@/hooks'

export const FramePoweredBy: FC = () => {
  const {
    state: { user }
  } = useFrame()

  return (
    <Box py={2} textAlign='center' bgColor='secondary.100'>
      <Flex align="center" justify="center">
        <Text color='secondary.500' fontSize='13px'>
          Powered by 
        </Text>
        <Image src="/favicon.ico" alt="Favicon" width={4} height={4} ml={1} mr="2px" />
        <Link _hover={{color:"blue", textDecoration: "underline"}} fontSize='13px' fontWeight="600" color="black" href="https://chatclinicai.com">ChatClinic</Link>
      </Flex>
    </Box>
  )
}
