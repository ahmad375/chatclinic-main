'use client'
import { FC, useState, useEffect, useRef } from 'react'
import { DashboardSectionTitle } from '@/components/dashboard'
import { Flex } from '@chakra-ui/react'
import {
  SubHeader,
  ChatContents,
  ChatBox,
  ContactInfo,
  SubSideBar,
  RightSearchWidget
} from './dashboardMessages'
import io from 'socket.io-client'
import { useDashboard } from '@/hooks'
import type { LiveChat } from '@/types'

export const DashboardMessagesPage: FC = () => {
  const [isContactInfoOpened, setIsContactInfoOpened] = useState(false)
  const [isRightSearchWidgetOpened, setIsRightSearchWidgetOpened] =
    useState(false)
  const { state, dispatch } = useDashboard()
  const [socket, setSocket] = useState<any>(null)

  const stateRef = useRef(state)

  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: { selectedTitle: 'Messages' }
    })
  }, [])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/livechats/${state.user.clientId}`)
        const initialLiveChats = (await res.json()) as LiveChat[]
        console.log(
          '=============initialLiveChats.length=========',
          initialLiveChats.length
        )
        if (initialLiveChats.length > 0) {
          dispatch({
            type: 'SET_ACTIVE_LIVECHAT',
            payload: initialLiveChats[0]
          })
        }

        dispatch({
          type: 'SET_INITIAL_LIVECHATS',
          payload: initialLiveChats
        })
      } catch {
        dispatch({
          type: 'SET_INITIAL_LIVECHATS',
          payload: []
        })
      }
    })()
  }, [])

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = () => {
    // const newSocket = io('http://localhost:5000');
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_ADDRESS!)

    newSocket.on('connect', () => {
      console.log('connected')
      setSocket(newSocket)
      newSocket.emit('identify', 'support', state.user.clientId)
    })

    newSocket.on('error', (error: Error) => {
      console.error('Socket error:', error)
    })

    newSocket.on('message', ({ fromId, message }) => {
      if (fromId == stateRef.current.activeLiveChat?.thread) {
        dispatch({
          type: 'ADD_NEW_MESSAGE_TO_ACTIVE_LIVECHAT',
          payload: message
        })

        dispatch({
          type: 'ADD_NEW_MESSAGE_TO_LIVECHATS',
          payload: message
        })
      } else {
        dispatch({
          type: 'ADD_NEW_MESSAGE_TO_LIVECHATS_NOT_ACTIVE',
          payload: {
            message: message,
            thread: fromId
          }
        })
      }
    })

    newSocket.on('newVisitor', async ({ thread }) => {
      const response = await fetch(
        `/api/livechats/${state.user.clientId}/${thread}`
      )

      const newLiveChat = await response.json()

      dispatch({
        type: 'ADD_NEW_LIVECHAT_TO_LIVECHATS',
        payload: newLiveChat
      })
    })
  }

  useEffect(() => {
    // Todo: no longer need to use ref
    const scrollableContainer = document.getElementById(
      'livechat-scrollable-container'
    )
    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight
    }
  }, [state.activeLiveChat?.messages])

  return (
    <>
      {/* <DashboardSectionTitle>Messages</DashboardSectionTitle> */}
      <Flex
        direction='row'
        borderTop='1px solid #e4eaf1'
        height='90vh'
        alignItems='center'
        justifyContent='flex-start'
        bgColor='white'
      >
        <SubSideBar />
        <Flex direction='column' minWidth='400px' height='100%' grow='1' pt='3'>
          <SubHeader
            setIsContactInfoOpened={setIsContactInfoOpened}
            setIsRightSearchWidgetOpened={setIsRightSearchWidgetOpened}
          />
          <ChatContents />
          <ChatBox socket={socket} />
        </Flex>
        {isContactInfoOpened && (
          <ContactInfo setIsContactInfoOpened={setIsContactInfoOpened} />
        )}
        {isRightSearchWidgetOpened && (
          <RightSearchWidget
            setIsRightSearchWidgetOpened={setIsRightSearchWidgetOpened}
          />
        )}
      </Flex>
    </>
  )
}
