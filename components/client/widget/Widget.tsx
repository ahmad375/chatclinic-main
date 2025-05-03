'use client'
import { useEffect, type FC } from 'react'
import { Flex, Icon } from '@chakra-ui/react'
import { BsFillChatFill } from '@react-icons/all-files/bs/BsFillChatFill'
import { BsX } from '@react-icons/all-files/bs/BsX'
import { Config } from '@/lib'
import { ClientMessageSender } from '@/enums'
import { useWidget } from '@/hooks'
import type { ClientMessage } from '@/types'

export const Widget: FC = () => {
  const {
    state: { user, active },
    dispatch
  } = useWidget()
  const size = `${Config.WidgetSize}px`

  useEffect(() => {
    const onMessage = (event: MessageEvent<ClientMessage>) => {
      if (
        event &&
        event.data &&
        event.data.sender &&
        (event.data.sender === ClientMessageSender.SCRIPT || event.data.sender === ClientMessageSender.FRAME)
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
    window.parent.postMessage(
      {
        sender: 'CHATCLINIC_WIDGET',
        type: 'SET_ACTIVE',
        payload: active
      } as ClientMessage,
      '*'
    )
  }, [active])

  return (
    <Flex
      width='100vw'
      height='100vh'
      alignItems='center'
      justifyContent='center'
      // trigger active toggle here instead of on widget bc it gets better click area
      onClick={() => dispatch({ type: 'TOGGLE_ACTIVE' })}
    >
      <Flex
        justifyContent='center'
        alignItems='center'
        w={size}
        h={size}
        bgColor={user.widgetTheme.primaryColor}
        rounded='full'
        cursor='pointer'
        transform='scale(1)'
        transition='transform 250ms'
        _active={{
          transform: 'scale(0.75)'
        }}
      >
        <Icon
          fontSize={active ? '3xl' : '2xl'}
          as={active ? BsX : BsFillChatFill}
          color='white'
        />
      </Flex>
    </Flex>
  )
}
