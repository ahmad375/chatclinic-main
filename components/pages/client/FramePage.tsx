'use client'
import { useRef, useEffect, type FC } from 'react'
import { useChat } from 'ai/react'
import { Text } from '@chakra-ui/react'
import { useFrame } from '@/hooks'
import { messagesToAIMessages } from '@/lib'
import { Frame, Messages, MessageBar } from '@/components/client'
import type { Message, StreamData } from '@/types'

export const FramePage: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    state: {
      user: { clientId },
      thread,
      initialMessages
    },
    dispatch
  } = useFrame()
  const { input, handleInputChange, handleSubmit, isLoading, messages, data } =
    useChat({
      api: '/api/client/chat',
      initialMessages: messagesToAIMessages(initialMessages || []),
      body: {
        clientId,
        thread
      }
    })

  useEffect(() => {
    dispatch({
      type: 'SET_PAGE_LOADING',
      payload: true
    })
    ;(async () => {
      try {
        const res = await fetch(
          `/api/client/messages/${clientId}/${thread}?p=1`
        )
        const initialMessages = (await res.json()) as Message[]

        dispatch({
          type: 'SET_INITIAL_MESSAGES',
          payload: initialMessages
        })
      } catch {
        dispatch({
          type: 'SET_INITIAL_MESSAGES',
          payload: []
        })
      }
    })()
  }, [])

  useEffect(() => {
    // Todo: no longer need to use ref
    const scrollableContainer = document.getElementById(
      'frame-scrollable-container'
    )
    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (data) {
      const annotatedMessages = (data as StreamData[]).flatMap((d) =>
        d.annotatedMessage ? [d.annotatedMessage] : []
      )
      dispatch({
        type: 'SET_ANNOTATED_MESSAGES',
        payload: annotatedMessages
      })
    }
  }, [data])

  return (
    <Frame
      {...{ ref }}
      title={
        <Text fontSize='xl' fontWeight={500}>
          Smart AI Agent
        </Text>
      }
      footer={
        <MessageBar
          {...{ input, handleInputChange, handleSubmit, isLoading }}
        />
      }
      hasMessageMarker
    >
      <Messages {...{ messages }} />
    </Frame>
  )
}
