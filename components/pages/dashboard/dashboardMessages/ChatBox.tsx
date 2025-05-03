'use client'
import { FC, useState, useRef } from 'react'
import {
  Flex,
  FormControl,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react'
import { useDashboard, useAPI, useNotification } from '@/hooks'
import type { LiveChat } from '@/types'
import { GrAttachment } from "react-icons/gr";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { nanoid } from 'nanoid'

export const ChatBox: FC<{socket:any}> = ({socket}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input, setInput] = useState('');
  const [isphoto, setIsphoto] = useState(true);
  const {state, dispatch} = useDashboard()
  const { request } = useAPI()
  const { setNotification } = useNotification()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = (isPhotoUpload: boolean) => {
    setIsphoto(isPhotoUpload)
    if (fileInputRef.current) {
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }, 100);
    }
  };

  const sendMessage = async (e: any) => {
    e.preventDefault()
    if(input){
      if(state.activeLiveChat !== undefined){
        setIsLoading(true)
        const newMessage: LiveChat["messages"][number] = {
          content: input,
          role: 'support',
          file: {
            fileName: '',
            fileType: '',
            fileSize: '',
            url: ''
          },
          readFlag: 1,
          created_at: new Date()
        }
        console.log('==============newMessage============',newMessage)
        await sendNewMessage(newMessage);
        setIsLoading(false)
      }else {
        setNotification({
          type: 'error',
          title: `Can't find user to receive!`
        })
        console.log(`Can't send message.`)
      }
    }

    setInput('')
  }

  const sendNewMessage = async (newMessage: LiveChat["messages"][number]) => {
    await request<{createdLiveChat: LiveChat}>(`/api/livechats/${state.user.clientId}/${state.activeLiveChat?.thread}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newMessage}),
      // setIsLoading,
    })
    socket && socket.emit("message", { from: 'support', fromId: state.user.clientId, message: newMessage, toId: state.activeLiveChat?.thread });
    dispatch({
      type: 'ADD_NEW_MESSAGE_TO_ACTIVE_LIVECHAT',
      payload: newMessage
    })

    dispatch({
      type: 'ADD_NEW_MESSAGE_TO_LIVECHATS',
      payload: newMessage
    })
  }

  function getFileSize(file: File) {
    const fileSize = file.size;
    let unit = 'bytes';
  
    if (fileSize > 1024 ** 3) {
      unit = 'GB';
      return `${(fileSize / (1024 ** 3)).toFixed(2)} ${unit}`;
    } else if (fileSize > 1024 ** 2) {
      unit = 'MB';
      return `${(fileSize / (1024 ** 2)).toFixed(2)} ${unit}`;
    } else if (fileSize > 1024) {
      unit = 'KB';
      return `${(fileSize / 1024).toFixed(2)} ${unit}`;
    } else {
      return `${fileSize} ${unit}`;
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      const file = event.target.files[0];

      if (file) {
        setIsLoading(true)
        console.log('=========Hey, here is chatbox!===========')
        const uniqueId = nanoid()
        const response = await fetch('/api/upload/file',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            fileName: `${uniqueId}${file.name}`,
            // type: 'application/octet-stream'
            fileType: file.type || 'application/octet-stream'
          })
        })
        const { presignedURL } = (await response.json())

        console.log('=========response=========', presignedURL)
        return new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('PUT', presignedURL, true);
          xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream'); // Set this to match the actual file type
    
          xhr.onload = async () => {
            if (xhr.status === 200) {
              const newMessage: LiveChat["messages"][number] = {
                content: '',
                file: {
                  fileName: file.name,
                  fileType: file.type || 'application/octet-stream',
                  fileSize: getFileSize(file),
                  url: `https://chatclinic.s3.amazonaws.com/${uniqueId}${file.name}`
                },
                role: 'support',
                readFlag: 1,
                created_at: new Date()
              }
              await sendNewMessage(newMessage);
              setIsLoading(false)
              console.log('File uploaded successfully');
              resolve(); // Resolve the promise indicating success
            } else {
              console.error('Error uploading file:', xhr.statusText);
              reject(new Error('Error uploading file')); // Reject the promise indicating failure
            }
          };
    
          xhr.onerror = function (error) {
            console.error('XHR onerror event', error);
            reject(new Error('Network error occurred during upload to S3')); // Reject on network errors
          };
    
          xhr.send(file); // Send the file blob
        });
      }
    }
  };

  return (
    <Flex direction="row" position="sticky" bottom={0}>
      <FormControl
        p={2}
        zIndex={3}
        as="form"
        display="flex"
        alignItems="center"
      >
        <Menu placement="top-start">
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<GrAttachment />}
            variant='outline'
            mr="3"
          />
          <MenuList>
            <MenuItem icon={<MdOutlinePhotoLibrary size={22} />} onClick={()=>{handleUploadClick(true);}}>
              Photo
            </MenuItem>
            <MenuItem icon={<IoDocumentTextOutline size={22} />} onClick={()=>{handleUploadClick(false);}}>
              Document
            </MenuItem>
          </MenuList>
          <input
            type="file"
            accept={isphoto?
              ".jpg, .jpeg, .png, .bmp, .webp, .ico, .xbm, .tif, pjp, .apng, .tiff, .gif, .svg, .jfif, .pjpeg, .avif":
              ".doc, .docx, .pdf, .txt, .rtf, .odt, .html, .htm, .docm, .json, .csv, .ods, .xlsx, .ppt, .pptx"
            }
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </Menu>
        <Input
          size="lg"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Type Message..."
          mr='2'
        />
        <Button isLoading={isLoading} type="submit" size="lg" onClick={sendMessage}>
          Send
        </Button>
      </FormControl>
    </Flex>
  )
}