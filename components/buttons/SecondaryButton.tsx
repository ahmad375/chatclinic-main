'use client'
import type { FC } from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'

export const SecondaryButton: FC<ButtonProps> = (props) => (
  <Button
    variant='outline'
    bgColor='transparent'
    color='primary.700'
    border='1px solid'
    borderColor='primary.700'
    fontWeight={500}
    _hover={{}}
    _active={{}}
    {...props}
  />
)
