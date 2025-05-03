'use client'
import { FC, useState, useEffect, useRef } from 'react'
import { Flex, Grid, Input, InputGroup, InputLeftElement, InputRightElement, IconButton, CloseButton } from '@chakra-ui/react'
import { IoIosSearch } from "react-icons/io";
import { useDashboard } from '@/hooks';
import { type LiveChat } from '@/types';
import { RightSearchResultItem } from '.';

export const RightSearchWidget: FC<{
  setIsRightSearchWidgetOpened: (value: boolean) => void
}> = ({setIsRightSearchWidgetOpened}) => {
  const [searchContent, setSearchContent] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResult, setSearchResult] = useState<LiveChat['messages']>([]);
  const {state} = useDashboard()

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value)
    if(e.target.value.length > 1){
      let tempResult: LiveChat['messages'] = [];
      state.activeLiveChat?.messages.forEach((message) => {
        if(message.content?.toLowerCase().includes(e.target.value.toLowerCase())){
          tempResult.push(message);
        }
      });
      setSearchResult(tempResult);
    }else {
      setSearchResult([]);
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <Flex
      height="100%"
      maxWidth={"100vw"}
      width={"320px"}
      minWidth={"320px"}
      direction="column"
      borderLeft="1px solid"
      pt="3"
      pl="0"
      borderColor={'#f5f6f6'}
    >
      <Grid
        pos='sticky'
        top={0}
        templateColumns='0fr 1fr'
        w='full'
        mb={3}
      >
        <IconButton ml="2" mr="2"
          aria-label='Close Button'
          icon={<CloseButton />}
          variant='outline'
          borderColor="gray.300"
          bg="white"
          onClick={()=> setIsRightSearchWidgetOpened(false)}
        />
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <IoIosSearch size={24} style={{ color: '#818689' }}/>
          </InputLeftElement>
          <Input ref={inputRef} value={searchContent} onChange={onChangeHandler} type='tel' placeholder='Search...' />
          {searchContent && 
            <InputRightElement>
              <CloseButton onClick={()=>{setSearchContent(''); setSearchResult([]);}} style={{ color: '#818689', cursor: 'pointer' }} />
            </InputRightElement>}
        </InputGroup>
      </Grid>
      {searchResult && searchResult.map((message, index)=>(
        <RightSearchResultItem key={index} searchContent={searchContent} setIsRightSearchWidgetOpened={setIsRightSearchWidgetOpened} message = {message} />
      ))}
    </Flex>
  )
}