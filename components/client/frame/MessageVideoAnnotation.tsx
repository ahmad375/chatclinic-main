'use client'
import type { FC } from 'react'
import {
  AspectRatio,
  Grid,
  GridItem,
  Text,
  Icon,
  Flex,
  Link,
  Image
} from '@chakra-ui/react'
import { FiExternalLink } from 'react-icons/fi'
import { FaPlay } from 'react-icons/fa'
import { clipText } from '@/lib'
import { useFrame } from '@/hooks'
import type { Video } from '@/types'

export const MessageVideoAnnotation: FC<{ video: Video }> = ({ video }) => {
  const {
    state: { user }
  } = useFrame()

  return (
    <Grid
      className='group'
      autoFlow='row'
      color='black'
      border='1px solid'
      borderColor='secondary.200'
      rounded='xl'
      overflow='hidden'
      cursor='pointer'
      onClick={() => window.open(video.url, '_blank')}
      pb={3}
    >
      <GridItem>
        <AspectRatio pos='relative' ratio={40 / 21} bgColor='secondary.200'>
          <>
            {video.image && (
              <Flex pos='relative'>
                <Flex
                  pos='absolute'
                  top={0}
                  left={0}
                  w='full'
                  h='full'
                  justifyContent='center'
                  alignItems='center'
                  bgColor='blackAlpha.300'
                >
                  <Flex
                    className='video-play-button'
                    justifyContent='center'
                    alignItems='center'
                    w={14}
                    h={14}
                    bgColor='blackAlpha.700'
                    rounded='full'
                  >
                    <Icon as={FaPlay} fontSize='xl' color='white' />
                  </Flex>
                </Flex>

                <Image
                  src={video.image}
                  objectFit='cover'
                  objectPosition='center'
                />
              </Flex>
            )}
            {!video.image && (
              <Flex justifyContent='center' alignItems='center'>
                <Icon as={FaPlay} fontSize='3xl' color='secondary.600' />
              </Flex>
            )}
          </>
        </AspectRatio>
      </GridItem>
      <GridItem px={4} pt={2.5}>
        <Link
          fontSize='lg'
          fontWeight='medium'
          color={user.widgetTheme.primaryColor}
          _groupHover={{
            textDecor: 'underline'
          }}
          isExternal
        >
          {clipText(video.title, 100)}&nbsp;
          <Icon as={FiExternalLink} display='inline' verticalAlign='-2px' />
        </Link>
      </GridItem>
      {video.description && (
        <GridItem px={4} py={1}>
          <Text fontSize='sm' color='secondary.600' fontWeight='regular'>
            {clipText(video.description, 75)}
          </Text>
        </GridItem>
      )}
    </Grid>
  )
}
