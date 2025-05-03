'use client'
import {
  forwardRef,
  useState,
  useEffect,
  type PropsWithChildren,
  type ReactNode
} from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useFrame } from '@/hooks'
import { ClientMessageSender } from '@/enums'
import { MessagesLimit } from '@/lib'
import type { ClientMessage, Message } from '@/types'
import { FrameHeader } from './FrameHeader'
import { FrameFooter } from './FrameFooter'
import { FrameLoading } from './FrameLoading'

var timeout: NodeJS.Timeout | undefined = undefined

export const Frame = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    title?: ReactNode
    back?: boolean
    footer?: ReactNode
    hasMessageMarker?: boolean
  }>
>(({ children, title, back, footer, hasMessageMarker }, ref) => {
  const [frameLoading, setFrameLoading] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const {
    state: { user, thread, pageLoading },
    dispatch
  } = useFrame()

  const onMoreMessages = async (): Promise<void> => {
    try {
      if (loadingMessages) return
      setLoadingMessages(true)

      const res = await fetch(
        `/api/client/messages/${user.clientId}/${thread}?p=${2}`
      )
      const messages = (await res.json()) as Message[]

      dispatch({
        type: 'ADD_INITIAL_MESSAGES',
        payload: {
          messages,
          noMoreMessages: messages.length < MessagesLimit
        }
      })
    } catch (e) {
    } finally {
      setLoadingMessages(false)
    }
  }

  useEffect(() => {
    const onMessage = (event: MessageEvent<ClientMessage>) => {
      if (
        event &&
        event.data &&
        event.data.sender &&
        event.data.sender === ClientMessageSender.SCRIPT
      ) {
        const clientMessage = event.data as ClientMessage
        switch (clientMessage.type) {
          case 'SET_ACTIVE':
            dispatch({
              type: 'SET_ACTIVE',
              payload: clientMessage.payload
            })

            break
        }
      }
    }

    window.addEventListener('message', onMessage)

    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => setFrameLoading(pageLoading), 500)
    return () => clearTimeout(timeout)
  }, [pageLoading])

  // symmetry broken
  // useEffect(() => {
  //   if (window !== undefined) {
  // window.parent.postMessage(
  //   {
  //     sender: 'CHATCLINIC_FRAME',
  //     type: 'SET_ACTIVE',
  //     payload: active
  //   } as ClientMessage,
  //   '*'
  // )
  //   }
  // }, [active])

  return (
    <Flex pos='relative' flexDir='column' h='100vh' maxH='fill-available'>
      {frameLoading && <FrameLoading />}
      <FrameHeader {...{ back }}>{title}</FrameHeader>
      <Box
        id='frame-scrollable-container'
        flex={1}
        bgColor='white'
        overflowY='scroll'
        // onScroll={(e) => {
        //   const target = e.target as HTMLDivElement
        //   if (target.scrollTop < 20) {
        //     onMoreMessages()
        //   }
        // }}
      >
        {children}
        {/* Scroll marker for parent ref */}
        {hasMessageMarker && <Box {...{ ref }} py={0} />}
      </Box>
      <FrameFooter>{footer}</FrameFooter>
    </Flex>
  )
})
