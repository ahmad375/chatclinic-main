'use client'
import type { FC } from 'react'
import {
  AspectRatio,
  Grid,
  GridItem,
  Text,
  Icon,
  Flex,
  Link
} from '@chakra-ui/react'
import { HiDocument } from 'react-icons/hi'
import { useFrame, useFrameRouter } from '@/hooks'
import type { Document } from '@/types'
import { clipText } from '@/lib'

export const MessageDocumentAnnotation: FC<{ document: Document }> = ({
  document
}) => {
  const {
    state: { user }
  } = useFrame()
  const { push } = useFrameRouter()

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
      onClick={() => push(`/frame/documents/${document._id.toString()}`)}
      pb={3}
    >
      <GridItem>
        <AspectRatio ratio={2.5} bgColor='secondary.200'>
          <Flex justifyContent='center' alignItems='center'>
            <Icon as={HiDocument} fontSize='4xl' color='secondary.500' />
          </Flex>
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
          {clipText(document.title, 100)}
        </Link>
      </GridItem>
      <GridItem px={4} py={1}>
        <Text fontSize='sm' color='secondary.600' fontWeight='regular'>
          {clipText(document.subtitle, 75)}
        </Text>
      </GridItem>
    </Grid>
  )
}
