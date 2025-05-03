'use client'
import { useState, type FC } from 'react'
import { type Message as IMessage } from 'ai/react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Icon,
  Link,
} from '@chakra-ui/react'
import { marked } from 'marked'
import { useFrame } from '@/hooks'
import type { LiveChat as LiveChatType } from '@/types'
import { FaFile } from "react-icons/fa";

export const LiveChat: FC<{ message?: LiveChatType["messages"][number] }> = ({ message }) => {

  const {
    state: { user }
  } = useFrame()
  const isUser = message?.role === 'user'
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState<any>('')

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
            {message?.file?.url && message?.file?.fileType?.includes('image') &&
              <Image
                maxWidth='200px'
                src={message?.file?.url}
                cursor='pointer'
                onClick={()=>{setIsOpen(true); setSelectedUrl(message?.file?.url)}}
              />
            }
            {message?.file?.url && !message?.file?.fileType?.includes('image') &&
              <Box display="flex" alignItems="center" marginLeft='-5px'>
                <Icon color='#9eb3cf' fontSize='40px' as={FaFile} mr={2} />
                <Link href={message?.file?.url} as='a' download={message.file?.fileName}>
                  <p>{message.file?.fileName}</p>
                  <p style={{fontSize: '12px'}}>{message?.file?.fileSize || 'undefined'}</p>
                </Link>
              </Box>
            }
            {message?.content && 
              <Text>{message?.content}</Text>
            }
            {/* <Text
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
            /> */}
          </Box>
        </GridItem>
      </Grid>
      <Modal isOpen={isOpen} onClose={()=>{setIsOpen(prev => !prev)}}>
        <ModalOverlay />
        <ModalContent marginTop="30vh" margin={'auto'} width={'fit-content'}>
          <ModalBody p={0} alignSelf={'center'}>
            <Image maxWidth='400px' src={selectedUrl} alt="Uploaded Image" background={'#54a4cd'} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
