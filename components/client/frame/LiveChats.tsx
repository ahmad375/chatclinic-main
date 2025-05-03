'use client'
import { type FC, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { MessagesLimit } from '@/lib'
import { LiveChat } from './LiveChat'
import { MoreMessagesLoader } from './MoreMessagesLoader'
import { useFrame } from '@/hooks'

export const LiveChats: FC<{}> = () => {
  const {
    state: {
      liveChats
    },
    dispatch
  } = useFrame()

  return (
    <Box px={6} py={4}>
      {liveChats.length >= MessagesLimit && <MoreMessagesLoader />}
      {liveChats.map((livechat, index) => (
        <LiveChat key={index} message= {livechat} />
      ))}
    </Box>
  )
}
