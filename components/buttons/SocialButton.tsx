'use client'
import type { FC } from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'

export const SocialButton: FC<ButtonProps> = (props) => (
  <Button
    bgColor='white'
    color='black'
    fontWeight={500}
    border='1px solid'
    borderColor='gray.200'
    _hover={{}}
    _active={{}}
    {...props}
  />
)
