'use client'
import {type FC, useState } from 'react'
import { useDashboard, useNotification, useAPI } from '@/hooks'
import { 
  Box,
  Grid,
  Flex,
  Avatar,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { Ticket } from '@/types'
import { UnexpectedErrorNotification } from '@/lib'
import { IoIosSearch } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FiBellOff } from "react-icons/fi";
import { GiConfirmed } from "react-icons/gi";
import { RiShareForwardLine } from "react-icons/ri";
import { TbLock } from "react-icons/tb";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PrimaryButton } from '@/components/buttons';

export const SubHeader: FC<{
  setIsContactInfoOpened: (value: boolean) => void,
  setIsRightSearchWidgetOpened: (value: boolean) => void
}> = ({setIsContactInfoOpened,setIsRightSearchWidgetOpened}) => {

  const { setNotification } = useNotification()
  const { request } =useAPI()
  const { state, dispatch } = useDashboard()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [action, setAction] = useState('')
  const [input, setInput] = useState('')
  // const initialHeight = 12 * 4
  const maxHeight = 32 * 4
  const nextHandler = async () => {
    if(action === 'Create_Ticket'){
      if(!input)
        return setNotification({
          type: 'error',
          title: 'You should type details to create ticket.'
        })
      try{
        setIsLoading(true)
        if(state.activeLiveChat?.email){
          const apiResponse = await request<{ ticket?: Ticket }>(
            '/api/tickets/create',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: state.activeLiveChat?.name,
                email: state.activeLiveChat?.email,
                details: input
              }),
              setIsLoading
            }
          )
          setIsOpen(false)
        }
      }catch{
       setNotification(UnexpectedErrorNotification)
      }finally{
        setIsLoading(false)        
      }
    }else if(action === 'Delete_Chat'){
      try{
        setIsLoading(true)
        const apiResponse = await request(
          `/api/livechats/${state.user.clientId}/${state.activeLiveChat?.thread}/delete`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            setIsLoading
          }
        )
        if(apiResponse.success){
          const updatedLiveChats = state.liveChats?.filter((chat) => chat.thread !== state.activeLiveChat?.thread);

          dispatch({
            type: 'SET_INITIAL_LIVECHATS',
            payload: updatedLiveChats
          })
    
          dispatch({
            type: 'SET_ACTIVE_LIVECHAT',
            payload: undefined
          })
        }
        setIsOpen(false)
      }catch{
        setNotification(UnexpectedErrorNotification)
      }finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      {state.activeLiveChat &&
        <Grid
        pos='sticky'
        top={0}
        templateColumns='1fr 0fr 0fr 0fr'
        w='full'
        borderBottom="1px solid"
        borderColor={ '#f5f6f6' }
        >
          <Flex
            width="100%"
            height="55px"
            pl="3"
            cursor="pointer"
            overflow="hidden"  
            maxWidth="100%"
            onClick={() => {setIsRightSearchWidgetOpened(false); setIsContactInfoOpened(true);}}
          >
            <Avatar
              src="https://ucaf4747c4cda08b31bfa7c702da.dl.dropboxusercontent.com/cd/0/inline/CLjhTrhnxpa3tvGOfGuYGNX-oBLhDqAnYy4bUjDZ77HtR6FDSuMTBlv1pp09gLkCcaMfudOqA7Xw-D9vMavzPJEUsQlS_lZPVklaUX5hltgb4do_XpVkYjIHIluFt_QKELYNGrGvO-A0QRAR4Qv979T0/file#"
              mr={3}
              style={{ width: '42px', height:'42px'}}
              name={state.activeLiveChat?.name}
              bgColor='purple.400'
              bg={ 'e2ccff' }
              color="#333333"
            />
            <Box maxWidth="70%" >
              <Heading isTruncated style={{fontSize:'18px'}}>{state.activeLiveChat?.name}</Heading>
              <Text style={{fontSize:'14px', color:'#12b76a'}}>Online</Text>
            </Box>
          </Flex>
          <IconButton mr="3"
            aria-label='Search database'
            icon={<IoIosSearch size={18}/>}
            variant='outline'
            borderColor="gray.300"
            bg="white"
            onClick={() => {setIsContactInfoOpened(false); setIsRightSearchWidgetOpened(true);}}
          />
          {/* <IconButton mr="3"
            aria-label='Call Button'
            icon={<IoCallOutline size={18}/>}
            variant='outline'
            borderColor="gray.300"
            bg="white"
          /> */}
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HiDotsVertical />}
              variant='outline'
              mr="3"
            />
            <MenuList>
              {/* <MenuItem icon={<FiBellOff />}>
                Mute
              </MenuItem>
              <MenuItem icon={<GiConfirmed />}>
                Select Messages
              </MenuItem>
              <MenuItem icon={<RiShareForwardLine />}>
                Share contact
              </MenuItem>
              <MenuItem icon={<TbLock />}>
                Block user
              </MenuItem> */}
              <MenuItem icon={<MdOutlineCreateNewFolder size={22} />} onClick={()=>{setIsOpen(true); setAction('Create_Ticket')}}>
                Create Ticket
              </MenuItem>
              <MenuItem icon={<RiDeleteBin6Line size={22} />} onClick={()=>{setIsOpen(true); setAction('Delete_Chat')}}>
                Delete Chat Room
              </MenuItem>
            </MenuList>
          </Menu>
        </Grid>
      }
      <Modal isOpen={isOpen} onClose={()=>{setIsOpen(prev => !prev)}}>
        <ModalOverlay />
        <ModalContent marginTop="30vh">
            <ModalHeader>
              {action=== 'Create_Ticket'? 'Create Ticket': 'Delete Chat'}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {action=== 'Create_Ticket' &&
              <FormControl isRequired>
                <FormLabel color='secondary.800'>Details</FormLabel>
                <Textarea
                  tabIndex={0}
                  resize='none'
                  rows={1}
                  size='md'
                  value={input}
                  onChange={(e)=> setInput(e.target.value)}
                  py={3}
                  pr={12}
                  // h={`${initialHeight}px`}
                  maxH={`${maxHeight}px`}
                  minH={'100px'}
                  placeholder='Type details here...'
                  // onKeyDown={(event) => {
                  //   if (
                  //     event.key === 'Enter' &&
                  //     !event.shiftKey &&
                  //     !event.nativeEvent.isComposing
                  //   ) {
                  //     formRef.current?.requestSubmit()
                  //     event.preventDefault()
                  //   }
                  // }}
                  _focus={{
                    boxShadow: 'none'
                  }}
                  _placeholder={{
                    color: 'secondary.300'
                  }}
                  _hover={{}}
                />
              </FormControl>
            }
            {action=== 'Delete_Chat' && 
              'Are you sure to remove this chat room?'
            }
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={()=>{setIsOpen(prev => !prev)}}>
              Cancel
            </Button>
            {action === 'Create_Ticket' &&
              <PrimaryButton isLoading={isLoading} onClick={nextHandler}>
                Create
              </PrimaryButton>
            }
            {action === 'Delete_Chat' &&
              <Button isLoading={isLoading} colorScheme='red' onClick={nextHandler}>
                Delete
              </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}