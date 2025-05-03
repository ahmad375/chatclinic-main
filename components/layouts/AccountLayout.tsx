'use client'
import type { FC, PropsWithChildren } from 'react'
import { Flex } from '@chakra-ui/react'

export const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      className='pattern'
      w='100vw'
      h='100vh'
      // maxH='fill-available'
      justifyContent='center'
      alignItems='center'
      p={6}
    >
      {children}
    </Flex>
  )
}
