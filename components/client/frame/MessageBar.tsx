'use client'
import { useRef, useEffect, useState, type FC } from 'react'
import type { UseChatHelpers } from 'ai/react'
import {
  IconButton,
  Flex,
  Icon,
  Box,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { IoSend } from '@react-icons/all-files/io5/IoSend'
import { useFrame } from '@/hooks'
import { GrAttachment } from "react-icons/gr";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { nanoid } from 'nanoid'
import type { LiveChat } from '@/types'

export const MessageBar: FC<{
  input: UseChatHelpers['input'] | string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  // handleInputChange: UseChatHelpers['handleInputChange']
  handleSubmit: UseChatHelpers['handleSubmit']
  isLoading: boolean,
  isLiveChat?: boolean,
  setIsLoading?: (value: boolean) => void,
  file?: LiveChat["messages"][number]["file"],
  setFile?: (value: LiveChat["messages"][number]["file"]) => void
}> = ({ input, handleInputChange, handleSubmit, isLoading, isLiveChat, setIsLoading, file, setFile }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const ref = useRef<HTMLTextAreaElement>(null)
  const {
    state: { user }
  } = useFrame()
  const initialHeight = 12 * 4
  const maxHeight = 32 * 4
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isphoto, setIsphoto] = useState(true);
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

  const onInput = () => {
    if (ref.current) {
      if (!input) {
        ref.current.style.height = `${initialHeight}px`
      } else {
        ref.current.style.height = `${
          ref.current.scrollHeight < maxHeight
            ? ref.current.scrollHeight
            : maxHeight
        }px`
      }
      ref.current.style.overflowY =
        ref.current.scrollHeight > maxHeight ? 'auto' : 'hidden'
    }
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
        setIsLoading && setIsLoading(true)
        console.log('=========Hey, here is LiveChat MessageBar!===========')
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
    
          xhr.onload = function () {
            if (xhr.status === 200) {
              const newFile = {
                fileName: file.name,
                fileType: file.type || 'application/octet-stream',
                fileSize: getFileSize(file),
                url: `https://chatclinic.s3.amazonaws.com/${uniqueId}${file.name}`
              }
              setFile && setFile(newFile)
              setIsLoading && setIsLoading(false)
              setTimeout(() => {
                formRef.current?.requestSubmit()
                event.preventDefault()
              }, 100);
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

  useEffect(() => {
    onInput()
  }, [input])

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{display: 'flex', alignItems:'center'}}>
      {isLiveChat &&
        <Menu placement="top-start">
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<GrAttachment />}
            variant='outline'
            mr="-10px"
            ml='10px'
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
      }
      <Box mx={4} mb={1} bgColor='white' border="1px solid" borderColor="gray.300" borderRadius="10" width='100%'>
        <Flex pos='relative' alignItems='center'>
          <Textarea
            ref={ref}
            tabIndex={0}
            resize='none'
            rows={1}
            size='md'
            value={input}
            onChange={handleInputChange}
            border='none'
            py={3}
            pr={12}
            h={`${initialHeight}px`}
            maxH={`${maxHeight}px`}
            overflowY='hidden'
            placeholder='Send a message...'
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                formRef.current?.requestSubmit()
                event.preventDefault()
              }
            }}
            _focus={{
              boxShadow: 'none'
            }}
            _placeholder={{
              color: 'secondary.300'
            }}
            _hover={{}}
          />
          <Flex
            pos='absolute'
            right='12px'
            bottom={0}
            h={12}
            alignItems='center'
          >
            <IconButton
              type='submit'
              size='sm'
              bgColor={user.widgetTheme.primaryColor}
              color='white'
              icon={<Icon as={IoSend} />}
              aria-label='Submit Message'
              zIndex={2}
              rounded='lg'
              isDisabled={input.trim() === ''}
              _focus={{}}
              _hover={{}}
              _active={{}}
              {...{ isLoading }}
            />
          </Flex>
        </Flex>
      </Box>
      {/* <Flex
        bottom={0}
        h={12}
        alignItems='center'
      >
        <IconButton
          type='submit'
          size='sm'
          bgColor={user.widgetTheme.primaryColor}
          color='white'
          icon={<Icon as={IoSend} />}
          aria-label='Submit Message'
          zIndex={2}
          rounded='lg'
          isDisabled={input.trim() === ''}
          _focus={{}}
          _hover={{}}
          _active={{}}
          {...{ isLoading }}
        />
      </Flex> */}
    </form>
  )
}
