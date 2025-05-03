'use client'
import type { FC } from 'react'
import { IconButton, type IconButtonProps } from '@chakra-ui/react'

export const PrimaryIconButton: FC<IconButtonProps> = (props) => (
  <IconButton
    bgColor='primary.700'
    color='white'
    fontWeight={500}
    _hover={{}}
    _active={{}}
    {...props}
  />
)
