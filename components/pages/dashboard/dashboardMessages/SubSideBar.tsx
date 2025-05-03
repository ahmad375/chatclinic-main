'use client'
import { FC, useState } from 'react'
import { useDashboard } from '@/hooks'
import type { LiveChat } from '@/types'
import { ChatRoom } from './ChatRoom';
import { Box, Grid, Flex, Input, InputGroup, InputLeftElement, InputRightElement, IconButton, CloseButton } from '@chakra-ui/react'
import { IoIosSearch } from "react-icons/io";
import { BsFilter } from "react-icons/bs";
type SearchItem = {
  liveChat: LiveChat;
  message: LiveChat['messages'][number];
};

export const SubSideBar: FC = () => {

  const {state} = useDashboard()
  const [unreadChats, setUnreadChats] = useState<boolean>(false)

  const [searchContent, setSearchContent] = useState('');
  const [searchFlag, setSearchFlag] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchContent(e.target.value);
    if(e.target.value.length > 1){
      setSearchFlag(true);
      let tempResult: SearchItem[] = [];
      state.liveChats?.forEach((liveChat)=>{
        liveChat.messages.forEach((message)=>{
          if(message.content?.toLowerCase().includes(e.target.value.toLowerCase())){
            tempResult.push({liveChat: liveChat, message: message});
          }
        })
      })
      setSearchResults(tempResult)
    }else {
      setSearchFlag(false);
      setSearchResults([]);
    }
  }

  return (
    <Flex
      height="100%"
      minWidth={"350px"}
      width={"350px"}
      direction="column"
      borderRight="1px solid"
      pt="3"
      borderColor={'#f5f6f6'}
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#ddd",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#aaa",
        }
      }}
    >
      <Box w='100%' h='42px' mt="1" mb='4'>
        <Grid
          pos='sticky'
          top={0}
          templateColumns='1fr 0fr'
          w='full'
        >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <IoIosSearch size={24} style={{ color: '#818689' }}/>
            </InputLeftElement>
            <Input type='tel' value={searchContent} onChange={searchHandler} placeholder='Search or start new chat' />
            {searchContent &&
              <InputRightElement>
                <CloseButton style={{ color: '#818689', cursor: 'pointer' }} onClick={()=>{setSearchContent(''); setSearchFlag(false);}} />
              </InputRightElement>}
          </InputGroup>
          <IconButton ml="3" mr="1"
            aria-label='Search database'
            icon={<BsFilter size={18}/>}
            variant='outline'
            borderColor="gray.300"
            _hover={unreadChats? {bg: "green.500", color:'white'} : {bg: "white"}}
            bg={unreadChats? "green.500" : "white"}
            color={unreadChats? "white": ""}
            onClick={()=>setUnreadChats(prevState => !prevState)}
          />
        </Grid>
      </Box>
      <Box w='100%' bg='white'>
        {searchFlag ? 
          (searchResults && searchResults.map((searchItem: SearchItem, index: number)=>(
            <ChatRoom key={index} liveChat= {searchItem.liveChat} searchedMessage={searchItem.message} {...{unreadChats}} {...{setUnreadChats}}/>
          ))):
          (state.liveChats && state.liveChats.map((liveChat: LiveChat, index: number)=>(
            <ChatRoom key={index} {...{liveChat}} {...{unreadChats}} {...{setUnreadChats}}/>
          )))
        }
      </Box>
    </Flex>
  )
}