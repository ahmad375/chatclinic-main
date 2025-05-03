'use client'
import type { FC } from 'react'
import { IconButton, type IconButtonProps } from '@chakra-ui/react'

export const SecondaryIconButton: FC<IconButtonProps> = (props) => (
  <IconButton
    variant='outline'
    bgColor='transparent'
    color='primary.700'
    border='1.5px solid'
    borderColor='primary.700'
    fontWeight={500}
    _hover={{}}
    _active={{}}
    {...props}
  />
)
