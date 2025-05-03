'use client'
import { type FC, useState, useEffect } from 'react'
import {
  Text,
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormHelperText,
  FormLabel,
  Box
} from '@chakra-ui/react'
import io from 'socket.io-client'
import { Frame, LiveChats, MessageBar } from '@/components/client'
import { Form } from '@/components/account'
import { CustomInput } from '@/components/common'
import { useNotification, useAPI, useFrame } from '@/hooks'
import { UnexpectedErrorNotification } from '@/lib'
import { PrimaryButton } from '@/components/buttons'
import type { LiveChat } from '@/types'

export const FrameLiveChatPage: FC<{}> = () => {
  const [socket, setSocket] = useState<any>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const { setNotification } = useNotification()
  const { request } = useAPI()
  const [isSubmittedUser, setIsSubmittedUser] = useState<null | string>(null)
  const [file, setFile] = useState<LiveChat['messages'][number]['file']>({})

  const {
    state: {
      user: { clientId },
      thread,
      liveChats
    },
    dispatch
  } = useFrame()

  useEffect(() => {
    // Todo: no longer need to use ref
    const scrollableContainer = document.getElementById(
      'frame-scrollable-container'
    )
    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight
    }
  }, [liveChats])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItem = localStorage.getItem('isSubmittedUser')
      setIsSubmittedUser(storedItem)
    }
  }, [])

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = () => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_ADDRESS!)
    // const newSocket = io('http://localhost:5000');

    newSocket.on('connect', () => {
      console.log('connected')
      setSocket(newSocket)
      newSocket.emit('identify', 'visitor', thread)
    })

    newSocket.on('error', (error: Error) => {
      console.error('Socket error:', error)
    })

    newSocket.on('message', ({ fromId, message }) => {
      console.log(`Received message from admin ${fromId}: ${message}`)
      dispatch({
        type: 'ADD_LIVECHATS',
        payload: message
      })
    })
  }

  useEffect(() => {
    if (isSubmittedUser) {
      dispatch({
        type: 'SET_PAGE_LOADING',
        payload: true
      })
      ;(async () => {
        try {
          const res = await fetch(
            `/api/client/livechats/${clientId}/${thread}?p=1`
          )
          const initialLiveChats = await res.json()

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
    }
  }, [isSubmittedUser])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoading(true)

      const form = e.target as HTMLFormElement

      await request<{ createdLiveChat: LiveChat }>(
        `/api/client/livechats/${clientId}/${thread}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.__name.value,
            email: form.email.value.toLowerCase()
          }),
          setIsLoading,
          async callback(apiResponse) {
            try {
              if (!apiResponse.success) return true

              setIsSubmittedUser('Yes')
              localStorage.setItem('isSubmittedUser', 'Yes')

              setNotification({
                type: 'success',
                title: 'Success',
                description: 'You have successfully submitted'
              })

              return true
            } catch {
              return false
            }
          }
        }
      ).then((response) => {
        dispatch({
          type: 'SET_INITIAL_LIVECHATS',
          payload: response.createdLiveChat.messages
        })
        socket && socket.emit('newVisitor', { fromId: thread, toId: clientId })
      })
    } catch {
      setNotification(UnexpectedErrorNotification)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input || (file && file.url)) {
      const res = await fetch(
        `/api/client/livechats/${clientId}/${thread}/checkStatus`
      )
      const currentState = await res.json()
      const readFlag = currentState == 1 ? 1 : 0

      let newMessage: LiveChat['messages'][number]

      if (input) {
        newMessage = {
          content: input,
          role: 'user',
          file: {
            fileName: '',
            fileType: '',
            fileSize: '',
            url: ''
          },
          readFlag: readFlag,
          created_at: new Date()
        }
      } else {
        newMessage = {
          content: '',
          role: 'user',
          file: file,
          readFlag: readFlag,
          created_at: new Date()
        }
      }

      await request<{ createdLiveChat: LiveChat }>(
        `/api/client/livechats/${clientId}/${thread}/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newMessage }),
          setIsLoading
        }
      )
      socket &&
        socket.emit('message', {
          from: 'visitor',
          fromId: thread,
          message: newMessage,
          toId: clientId
        })
      dispatch({
        type: 'ADD_LIVECHATS',
        payload: newMessage
      })
    }

    setInput('')
  }

  return (
    <Frame
      title={
        <Text fontSize='xl' fontWeight={500}>
          Live Chat
        </Text>
      }
      footer={
        isSubmittedUser && (
          <MessageBar
            {...{
              input,
              handleInputChange,
              handleSubmit,
              isLoading,
              isLiveChat: true,
              setIsLoading,
              file,
              setFile
            }}
          />
        )
      }
    >
      {isSubmittedUser ? (
        <LiveChats />
      ) : (
        <Form onSubmit={handleInfoSubmit}>
          <Grid mx='2' autoFlow='row' rowGap={3} textAlign='center'>
            <Box height='5px' />
            <Heading fontSize='24px'>Submit your info</Heading>
            <Text fontSize='15px'>
              Submit your info to chat with human support
            </Text>
            <Box height='8px' />
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize='16px'>Name</FormLabel>
                <CustomInput type='text' name='__name' placeholder='John Doe' />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel fontSize='16px'>Email</FormLabel>
                <CustomInput
                  type='email'
                  name='email'
                  placeholder='yourname@example.com'
                  autoComplete='off'
                />
              </FormControl>
            </GridItem>
            <Box height='4px' />
            <GridItem pt={2}>
              <PrimaryButton
                type='submit'
                w='full'
                rounded='lg'
                {...{ isLoading }}
              >
                Submit
              </PrimaryButton>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Frame>
  )
}
