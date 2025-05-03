'use client'
import type { FC } from 'react'
import { IconButton, type IconButtonProps } from '@chakra-ui/react'

export const GhostIconButton: FC<IconButtonProps> = (props) => (
  <IconButton
    bgColor='transparent'
    color='white'
    fontWeight={500}
    _hover={{
      bgColor: 'whiteAlpha.100'
    }}
    _active={{
      bgColor: 'whiteAlpha.200'
    }}
    {...props}
  />
)
