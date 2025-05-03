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
import { HiLink } from 'react-icons/hi'
import { FiExternalLink } from 'react-icons/fi'
import { clipText } from '@/lib'
import { useFrame } from '@/hooks'
import type { Page } from '@/types'

export const MessagePageAnnotation: FC<{ page: Page }> = ({ page }) => {
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
      onClick={() => window.open(page.url, '_blank')}
      pb={3}
    >
      <GridItem>
        <AspectRatio pos='relative' ratio={40 / 21} bgColor='secondary.200'>
          <>
            {page.image && (
              <Image
                src={page.image}
                objectFit='cover'
                objectPosition='center'
              />
            )}
            {!page.image && (
              <Flex justifyContent='center' alignItems='center'>
                <Icon as={HiLink} fontSize='3xl' color='secondary.600' />
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
          {clipText(page.title, 100)}&nbsp;
          <Icon as={FiExternalLink} display='inline' verticalAlign='-2px' />
        </Link>
      </GridItem>
      {page.description && (
        <GridItem px={4} py={1}>
          <Text fontSize='sm' color='secondary.600' fontWeight='regular'>
            {clipText(page.description, 75)}
          </Text>
        </GridItem>
      )}
    </Grid>
  )
}
