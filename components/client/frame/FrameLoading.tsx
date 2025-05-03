'use client'
import type { FC } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

export const FrameLoading: FC = () => {
  return (
    <Flex
      pos='absolute'
      top={0}
      left={0}
      w='full'
      h='full'
      justifyContent='center'
      alignItems='center'
      bgColor='blackAlpha.400'
      zIndex={3}
    >
      <Spinner color='white' />
    </Flex>
  )
}
