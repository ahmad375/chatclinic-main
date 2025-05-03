'use client'
import { FC, useState, useEffect, useRef } from 'react'
import type { LiveChat } from '@/types'
import { Flex, Grid, Avatar, Box, Text, Badge, Heading } from '@chakra-ui/react'
import { useDashboard } from '@/hooks';

export const ChatRoom: FC<{
  liveChat: LiveChat,
  searchedMessage?: LiveChat["messages"][number],
  unreadChats?: boolean
  setUnreadChats: (unreadChats: boolean) => void
}> = ({liveChat, unreadChats, setUnreadChats,searchedMessage}) => {

  const {state, dispatch} = useDashboard()
  const [unReadNumber, setUnReadNumber] = useState<number>(0)
  const [lastMessage, setLastMessage] = useState<any>('')
  const [lastTime, setLastTime] = useState<any>('')
  // const [currentLiveChat, setCurrentLiveChat]  =  useState<LiveChat>(liveChat)
  const timezoneChangeHandler = (created_at: Date) => {
    const today = new Date();
    const createdDate = new Date(created_at);
    
    // Check if the created date is today
    if (createdDate.toDateString() === today.toDateString()) {
      return createdDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}).replace(/^24/, '00');
    }
    
    // Check if the created date is yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (createdDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // Check if the created date is within the current week
    const currentDay = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);
    if (createdDate >= weekStart) {
      return createdDate.toLocaleDateString([], {weekday: 'long'});
    }
    
    // If the created date is before the current week
    return createdDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
  }

  useEffect(()=>{
    if (liveChat.messages && liveChat.messages.length > 0) {
      if(liveChat.messages[liveChat.messages.length - 1].file?.url){
        setLastMessage(liveChat.messages[liveChat.messages.length - 1].file?.fileType?.includes('image')? 'Photo': 'File');
      }else{
        setLastMessage(liveChat.messages[liveChat.messages.length - 1].content);
      }
      const unreadMessagesCount = liveChat.messages.filter(message => message.readFlag === 0).length;
      setUnReadNumber(unreadMessagesCount)
      const lastMessageObj = liveChat.messages[liveChat.messages.length - 1];
      if(searchedMessage){
        if(searchedMessage.created_at){
          const temp = timezoneChangeHandler(searchedMessage.created_at);
          setLastTime(temp)
        }
      }else {
        if (lastMessageObj.created_at) {
          const temp = timezoneChangeHandler(lastMessageObj.created_at);
          setLastTime(temp)
        }
      }
    }
  },[liveChat])


  const clickHandler = async ()=>{
    try {      
      const updatedLiveChats = state.liveChats?.map((chat) => {
        if (chat === liveChat) {
          const updatedMessages = chat.messages.map((message) => {
            return { ...message, readFlag: 1 };
          });
          return { ...chat, activeFlag: 1, messages: updatedMessages };
        } else {
          return { ...chat, activeFlag: 0 };
        }
      });
      
      await fetch(`/api/livechats/${state.user.clientId}/${liveChat.thread}/active`)

      const updatedCurrentMessages = liveChat.messages.map((message)=>{
        return {...message, readFlag: 1}
      })

      const updatedCurrentLiveChat = {...liveChat, activeFlag: 1, messages: updatedCurrentMessages}
      setUnreadChats(false)
      dispatch({
        type: 'SET_INITIAL_LIVECHATS',
        payload: updatedLiveChats
      })

      dispatch({
        type: 'SET_ACTIVE_LIVECHAT',
        payload: updatedCurrentLiveChat
      })

      if(searchedMessage){
        setTimeout(() => {
          const messageElement = document.getElementById(`${searchedMessage.created_at}`);
          console.log('=======messageElement================', messageElement)
          if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    } catch {
      dispatch({
        type: 'SET_INITIAL_LIVECHATS',
        payload: []
      })
    }
  }

  if(unreadChats && unReadNumber === 0)
    return (<></>)
  return (
    <Flex
      align="center"
      width="100%"
      height="66px!important"
      my="2"
      py="2"
      px='2'
      cursor='pointer'
      overflow="hidden"
      borderColor={ 'gray.200' }
      borderRadius={5}
      bgColor={(!searchedMessage && liveChat.thread == state.activeLiveChat?.thread) ? "#edf2f7" : "inherit"}
      // bgColor = {liveChat.activeFlag && "#edf2f7"}
      _hover={{bgColor:"#edf2f7"}}
      // maxWidth="100%"
      onClick={clickHandler}
    >
      <Avatar
        // src="https://ucaf4747c4cda08b31bfa7c702da.dl.dropboxusercontent.com/cd/0/inline/CLjhTrhnxpa3tvGOfGuYGNX-oBLhDqAnYy4bUjDZ77HtR6FDSuMTBlv1pp09gLkCcaMfudOqA7Xw-D9vMavzPJEUsQlS_lZPVklaUX5hltgb4do_XpVkYjIHIluFt_QKELYNGrGvO-A0QRAR4Qv979T0/file#"
        bgColor='purple.400'
        bg={ 'e2ccff' }
        mr="3"
        color='#333333'
        name={liveChat.name}
        userSelect='none'
        onClick={() => {}}
        style={{ width: '42px', height:'42px'}}
      />
      <Box width={'285px'} justifyContent="space-between">
        <Grid
          pos='sticky'
          top={0}
          mb="2"
          display="flex"
          justifyContent="space-between"
          w='full'
        >
          <Heading isTruncated style={{fontSize:'18px', fontWeight:'600'}}>{liveChat.name}</Heading>
          <Text style={{fontSize:'14px', color:'#818689'}}>{lastTime}</Text>
        </Grid>
        <Grid
          pos='sticky'
          top={0}
          templateColumns='1fr 0fr'
          w='full'
        >
          <Text width='250px' isTruncated style={{fontSize:'14px', color:'#818689'}}>{searchedMessage? searchedMessage.content: lastMessage}</Text>
          {unReadNumber !== 0 &&
            <Badge borderRadius="full" fontSize="12px" color="white" bgColor="#0173ff" px="2" pt="0.5">
              {unReadNumber}
            </Badge>}
        </Grid>
      </Box>
    </Flex>
  )
}