'use client'
import { useEffect, type FC } from 'react'
import { type Message as IMessage } from 'ai/react'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { marked } from 'marked'
import { useFrame } from '@/hooks'
import type { Message as ChatwizardMessage } from '@/types'
import {
  MessageDocumentAnnotation,
  MessagePageAnnotation,
  MessageVideoAnnotation
} from '..'

export const Message: FC<{ message?: IMessage }> = ({ message }) => {
  const {
    state: { user, initialMessages, annotatedMessages }
  } = useFrame()
  const isUser = message?.role === 'user'
  const referenceMessages = [...(initialMessages || []), ...annotatedMessages]

  let annotations: ChatwizardMessage['annotations'] | undefined
  if (referenceMessages && message) {
    const matchingInitialMessage = referenceMessages.find(
      (m) => m._id.toString() === message.id || m.content === message.content
    )
    if (matchingInitialMessage) {
      annotations = matchingInitialMessage.annotations
    }
  }

  useEffect(() => {
    const scrollableContainer = document.getElementById(
      'frame-scrollable-container'
    )
    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight
    }
  }, [annotations])

  return (
    <Flex
      flexDir={isUser ? 'row-reverse' : 'row'}
      justifyContent='flex-start'
      alignItems='flex-end'
      columnGap={2}
      py={2}
    >
      <Grid autoFlow='row' rowGap={2} maxW={80}>
        <GridItem>
          <Box
            pos='relative'
            w='full'
            minH={10}
            px={3}
            py={2}
            bgColor={isUser ? user.widgetTheme.primaryColor : 'secondary.200'}
            color={isUser ? 'white' : 'black'}
            rounded='xl'
            _before={{
              content: '""',
              position: 'absolute',
              zIndex: 0,
              bottom: 0,
              [isUser ? 'right' : 'left']: '-8px',
              height: '20px',
              width: '20px',
              backgroundColor: isUser
                ? user.widgetTheme.primaryColor
                : 'secondary.200',
              backgroundAttachment: 'fixed',
              [isUser ? 'roundedBottomLeft' : 'roundedBottomRight']: '15px'
            }}
            _after={{
              content: '""',
              position: 'absolute',
              zIndex: 1,
              bottom: 0,
              [isUser ? 'right' : 'left']: '-10px',
              width: '10px',
              height: '20px',
              backgroundColor: 'white',
              [isUser ? 'roundedBottomLeft' : 'roundedBottomRight']: '10px'
            }}
          >
            <Text
              className='chatwizard-message-content'
              fontSize='md'
              fontWeight={400}
              whiteSpace={isUser ? undefined : 'pre-wrap'}
              dangerouslySetInnerHTML={{
                __html:
                  !message || !message.content
                    ? ''
                    : isUser
                    ? message.content
                    : marked.parseInline(message.content, {
                        async: false
                      })
              }}
            />
          </Box>
        </GridItem>
        {annotations?.document && (
          <GridItem>
            <MessageDocumentAnnotation document={annotations.document} />
          </GridItem>
        )}
        {annotations?.page && (
          <GridItem>
            <MessagePageAnnotation page={annotations.page} />
          </GridItem>
        )}
        {annotations?.video && (
          <GridItem>
            <MessageVideoAnnotation video={annotations.video} />
          </GridItem>
        )}
      </Grid>
    </Flex>
  )
}
