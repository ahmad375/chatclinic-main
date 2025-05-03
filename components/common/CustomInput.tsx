'use client'
import { forwardRef, type FC } from 'react'
import { Input, type InputProps } from '@chakra-ui/react'

export const CustomInput = forwardRef<HTMLDivElement, InputProps>(
  (props, ref) => (
    <Input
      {...{ ref }}
      w='full'
      border='1px solid'
      borderColor='secondary.200'
      bgColor='white'
      rounded='md'
      _hover={{
        borderColor: 'secondary.200'
      }}
      _placeholder={{
        color: 'secondary.300'
      }}
      _focus={{
        boxShadow: '0 0 0 1px var(--chakra-colors-primary-700)',
        borderColor: 'primary.700'
      }}
      {...props}
    />
  )
)
