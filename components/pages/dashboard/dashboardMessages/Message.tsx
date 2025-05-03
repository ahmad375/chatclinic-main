import { type FC, useState, useEffect } from 'react'
import { 
  Box,
  Text,
  Image,
  Icon,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import type { LiveChat } from '@/types'
import { FaFile } from "react-icons/fa";

export const Message: FC<{message: LiveChat["messages"][number]}> = ({message}) => {

  const timezoneChangeHandler = (created_at: Date) => {
    const createdDate = new Date(created_at);
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}).replace(/^24/, '00');
    
    // Convert created date to local time
    const createdTime = createdDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}).replace(/^24/, '00');
    
    return createdTime;
  }
  
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState<any>('')
  const role = message.role
  const createdTime = message.created_at? timezoneChangeHandler(message.created_at): ''

  return (
    <Box id={`${message.created_at}`} display="flex" flexDirection="column" alignItems={role === 'support' ? 'flex-end' : 'flex-start'} my={2}>
      <Box alignSelf={role === 'support' ? 'flex-end' : 'flex-start'}>
        <Text fontSize="sm" color="gray.500">{createdTime}</Text>
      </Box>
      <Box
        bg={role === 'support' ? '#d6f1ff' : 'white'}
        maxWidth="60%"
        width="max-content"
        py={1}
        px={3}
        rounded="md"
        wordBreak="break-word"
        color="black"
        mb={1}
      >
        {message?.file?.url && message?.file?.fileType?.includes('image') &&
          <Image
            maxWidth='300px'
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
        {message.content && 
          <Text>{message.content}</Text>
        }
      </Box>
      
      <Modal isOpen={isOpen} onClose={()=>{setIsOpen(prev => !prev)}}>
        <ModalOverlay />
        <ModalContent marginTop="30vh" margin={'auto'} width={'fit-content'}>
          <ModalBody p={0} alignSelf={'center'}>
            <Image maxWidth='800px' src={selectedUrl} alt="Uploaded Image" background={'#54a4cd'} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}