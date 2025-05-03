'use client'
import type { FC, PropsWithChildren } from 'react'
import { Grid, GridItem, Icon, IconButton } from '@chakra-ui/react'
import { FiX } from '@react-icons/all-files/fi/FiX'
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft'
import { useFrame, useFrameRouter } from '@/hooks'
import { ClientMessageSender } from '@/enums'
import type { ClientMessage } from '@/types'

export const FrameHeader: FC<PropsWithChildren<{ back?: boolean }>> = ({
  back,
  children
}) => {
  const {
    state: { user }
  } = useFrame()
  const { back: backFn } = useFrameRouter()
  const onClose = () =>
    window.parent.postMessage(
      {
        sender: ClientMessageSender.FRAME,
        type: 'SET_ACTIVE',
        payload: false
      } as ClientMessage,
      '*'
    )

  return (
    <Grid
      flexGrow={0}
      flexShrink={1}
      templateColumns={back ? '0fr 1fr 0fr' : '1fr 0fr'}
      alignItems='center'
      px={6}
      py={6}
      bgColor={user.widgetTheme.primaryColor}
      color='white'
    >
      {back && (
        <GridItem>
          <IconButton
            icon={<Icon as={FiChevronLeft} fontSize='xl' />}
            color='white'
            bgColor='blackAlpha.100'
            rounded='lg'
            onClick={backFn}
            aria-label='Close'
            _focus={{}}
            _hover={{
              bgColor: 'blackAlpha.200'
            }}
            _active={{
              bgColor: 'blackAlpha.300'
            }}
          />
        </GridItem>
      )}
      <GridItem>{children}</GridItem>
      <GridItem>
        {!back && (
          <IconButton
            icon={<Icon as={FiX} fontSize='xl' />}
            color='white'
            bgColor='blackAlpha.100'
            rounded='lg'
            onClick={onClose}
            aria-label='Close'
            _focus={{}}
            _hover={{
              bgColor: 'blackAlpha.200'
            }}
            _active={{
              bgColor: 'blackAlpha.300'
            }}
          />
        )}
      </GridItem>
    </Grid>
  )
}
