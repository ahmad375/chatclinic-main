'use client'
import type { FC } from 'react'
import { Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight'
import { useFrame, useFrameRouter } from '@/hooks'
import { clipText } from '@/lib'
import type { Document } from '@/types'

export const FrameDocument: FC<{
  document: Document
  noBottomBorder?: boolean
}> = ({ document, noBottomBorder }) => {
  const {
    state: { user }
  } = useFrame()
  const { push } = useFrameRouter()

  return (
    <Grid
      className='group'
      templateColumns='1fr 0fr'
      columnGap={3}
      alignItems='center'
      cursor='pointer'
      bgColor='white'
      {...(!noBottomBorder && {
        borderBottom: '1px solid',
        borderBottomColor: 'secondary.200'
      })}
      px={6}
      py={4}
      onClick={() => push(`/frame/documents/${document._id}`)}
      _hover={{
        bgColor: `${user.widgetTheme.primaryColor}10`
      }}
      _focus={{
        bgColor: `${user.widgetTheme.primaryColor}10`
      }}
    >
      <GridItem>
        <Text
          fontSize='lg'
          color='black'
          fontWeight={500}
          lineHeight='150%'
          _groupHover={{ color: user.widgetTheme.primaryColor }}
        >
          {document.title}
        </Text>
        <Text fontSize='md' color='secondary.600' mt={0.5}>
          {clipText(document.subtitle, 100)}
        </Text>
      </GridItem>
      <GridItem>
        <Icon
          as={FiChevronRight}
          fontSize='2xl'
          color='secondary.800'
          _groupHover={{
            color: user.widgetTheme.primaryColor
          }}
          _groupFocus={{
            color: user.widgetTheme.primaryColor
          }}
        />
      </GridItem>
    </Grid>
  )
}
