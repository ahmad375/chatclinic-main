'use client'
import type { FC } from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'

export const PrimaryButton: FC<ButtonProps> = (props) => (
  <Button
    bgColor='primary.700'
    color='white'
    fontWeight={500}
    _hover={{}}
    _active={{}}
    {...props}
  />
)
