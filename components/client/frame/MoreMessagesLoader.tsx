'use client'
import type { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { useFrame } from '@/hooks'

export const MoreMessagesLoader: FC = () => {
  const {
    state: { noMoreMessages }
  } = useFrame()

  if (noMoreMessages) return null

  return <Box pt={3} pb={6}></Box>
}
