'use client'
import type { FC } from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'

export const GhostButton: FC<ButtonProps> = (props) => (
  <Button
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
