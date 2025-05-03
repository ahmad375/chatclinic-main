'use client'
import type { FC } from 'react'
import { useDashboard } from '@/hooks'
import { Box, Grid, GridItem, Flex, Spacer, Avatar, Heading, Text, FormControl, Input, Button, CloseButton } from '@chakra-ui/react'
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { TbNotes } from "react-icons/tb";

export const ContactInfo: FC<{
  setIsContactInfoOpened: (value: boolean) => void,
}> = ({setIsContactInfoOpened}) => {

  const {  state } = useDashboard()

  return (
    <Flex
      height="100%"
      maxWidth={"100vw"}
      width={"320px"}
      minWidth={"320px"}
      direction="column"
      borderLeft="1px solid"
      pt="3"
      pl="6"
      borderColor={'#f5f6f6'}
    >
      <Box pb="4" borderBottom="1px solid" borderColor="#e2e8f0">
        <Grid
          pos='sticky'
          top={0}
          templateColumns='1fr 0fr'
          w='full'
        >
          <GridItem>
            <Text style={{fontSize:'18px', marginTop:'8px', fontWeight:'bold'}}>Contact Info</Text>
          </GridItem>
          <GridItem pt="1.5">
            <CloseButton
              onClick={()=>{setIsContactInfoOpened(false);}} />
          </GridItem>
        </Grid>
        <Box h='40px' />
        <Avatar
          src="https://ucaf4747c4cda08b31bfa7c702da.dl.dropboxusercontent.com/cd/0/inline/CLjhTrhnxpa3tvGOfGuYGNX-oBLhDqAnYy4bUjDZ77HtR6FDSuMTBlv1pp09gLkCcaMfudOqA7Xw-D9vMavzPJEUsQlS_lZPVklaUX5hltgb4do_XpVkYjIHIluFt_QKELYNGrGvO-A0QRAR4Qv979T0/file#"
          bgColor='purple.400'
          bg={ 'e2ccff' }
          color='#333333'
          name={state.activeLiveChat?.name}
          mb="2"
          userSelect='none'
          style={{ width: '60px', height:'60px'}}
        />
        <Box maxWidth="70%" >
          <Heading isTruncated style={{fontSize:'18px'}}>{state.activeLiveChat?.name}</Heading>
          <Text style={{fontSize:'14px', color:'#12b76a'}}>Online</Text>
        </Box>
      </Box>
      <Box>
        {/* <Box mt="5">
          <Grid
            top={0}
            templateColumns='0fr 1fr'
            w='full'
            color="#818689"
            alignItems="center"
            mb="2"
          >
            <IoCallOutline size="20"/>
            <Text style={{fontSize:'16px', marginLeft:'10px'}}>Phone Number</Text>
          </Grid>
          <Box px="1.5" py="1" m='0' width="max-content" fontSize="16px" color="#0687ff" border="1px solid" borderRadius="8px" borderColor="#e6e7e7">
            <Text fontWeight="bold">{state.activeLiveChat?.phone_number || 'Undefined'}</Text>
          </Box>
        </Box> */}
        <Box mt="5">
          <Grid
            top={0}
            templateColumns='0fr 1fr'
            w='full'
            color="#818689"
            alignItems="center"
            mb="2"
          >
            <MdOutlineMail size="20"/>
            <Text style={{fontSize:'16px', marginLeft:'10px'}}>Email</Text>
          </Grid>
          <Box px="1.5" py="1" m='0' width="max-content" fontSize="16px" color="#0687ff" border="1px solid" borderRadius="8px" borderColor="#e6e7e7">
            <Text fontWeight="bold">{state.activeLiveChat?.email || 'Undefined'}</Text>
          </Box>
        </Box>
        {/* <Box mt="7">
          <Grid
            top={0}
            templateColumns='0fr 1fr'
            w='full'
            color="#818689"
            alignItems="center"
            mb="2"
          >
            <CiLocationOn size="20"/>
            <Text style={{fontSize:'16px', marginLeft:'10px'}}>Location</Text>
          </Grid>
          <Box px="1.5" py="1" m='0' width="max-content" fontSize="16px">
            <Text fontWeight="bold">{state.activeLiveChat?.location || 'Undefined'}</Text>
          </Box>
        </Box>
        <Box mt="7">
          <Grid
            top={0}
            templateColumns='0fr 1fr'
            w='full'
            color="#818689"
            alignItems="center"
            mb="2"
          >
            <BiWorld size="20"/>
            <Text style={{fontSize:'16px', marginLeft:'10px'}}>Timezone</Text>
          </Grid>
          <Box px="1.5" py="1" m='0' width="max-content" fontSize="16px" >
            <Text fontWeight="bold">{state.activeLiveChat?.timeZone || 'Undefined'}</Text>
          </Box>
        </Box>
        <Box mt="7">
          <Grid
            top={0}
            templateColumns='0fr 1fr'
            w='full'
            color="#818689"
            alignItems="center"
            mb="2"
          >
            <TbNotes size="20"/>
            <Text style={{fontSize:'16px', marginLeft:'10px'}}>Notes</Text>
          </Grid>
          <Box px="1.5" py="1" m='0' fontSize="16px" >
            <Text fontWeight="500">{"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es"}</Text>
          </Box>
        </Box> */}
      </Box>
    </Flex>
  )
}