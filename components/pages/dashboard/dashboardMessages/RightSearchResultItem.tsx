'use client'
import { FC, useState, useEffect } from 'react'
import type { LiveChat } from '@/types'
import { Flex, Grid, Divider, Text, Box } from '@chakra-ui/react'

export const RightSearchResultItem: FC<{
  message: LiveChat["messages"][number],
  setIsRightSearchWidgetOpened: (value: boolean) => void,
  searchContent: string
}> = ({message, setIsRightSearchWidgetOpened, searchContent}) => {

  const [currentTime, setCurrentTime] = useState<any>('')
  const [content, setContent] = useState<string>('')

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
    if(message.content){
      const regex = new RegExp(`\\b(${searchContent})\\b`, 'gi');
      const highlightedContent = message.content.replace(regex, `<span style="color: green; font-weight: bold;">$&</span>`);
      setContent(highlightedContent);
    }
  })

  useEffect(()=>{
    if(message.created_at){
      let temp = timezoneChangeHandler(message.created_at);
      setCurrentTime(temp);
    }
  },[])

  const clickHandler = async ()=>{
    console.log('=======message.created_at=========', message.created_at)
    const messageElement = document.getElementById(`${message.created_at}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsRightSearchWidgetOpened(false);
  }

  return (
    <Flex
      align="center"
      width="100%"
      height="66px!important"
      // py="2"
      px='2'
      cursor='pointer'
      overflow="hidden"
      borderColor={ 'gray.200' }
      borderRadius={5}
      _hover={{bgColor:"#edf2f7"}}
      onClick={clickHandler}
    >
      <Grid
        pos='sticky'
        top={0}
        w='full'
      >
        <Text style={{fontSize:'14px', color:'#818689'}}>{currentTime}</Text>
        {/* <Text width='100%' isTruncated style={{fontSize:'14px', color:'#818689'}}>{message.content}</Text> */}
        <Text width='100%' isTruncated style={{fontSize:'14px', color:'#818689'}} dangerouslySetInnerHTML={{ __html: content }}/>
        <Box height="10px" />
        <Divider />
      </Grid>
    </Flex>
  )
}