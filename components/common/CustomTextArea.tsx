'use client'
import type { FC } from 'react'
import { Textarea, type TextareaProps } from '@chakra-ui/react'

export const CustomTextArea: FC<TextareaProps> = (props) => {
  return (
    <Textarea
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
}
