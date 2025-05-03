'use client'
import type { FC } from 'react'
import type { UseChatHelpers } from 'ai/react'
import { Box } from '@chakra-ui/react'
import { MessagesLimit } from '@/lib'
import { Message } from './Message'
import { MoreMessagesLoader } from './MoreMessagesLoader'

export const Messages: FC<{ messages: UseChatHelpers['messages'] }> = ({
  messages
}) => {
  return (
    <Box px={6} py={4}>
      {messages.length >= MessagesLimit && <MoreMessagesLoader />}
      {[...messages].map((message) => (
        <Message key={`message-${message.id}`} {...{ message }} />
      ))}
    </Box>
  )
}
