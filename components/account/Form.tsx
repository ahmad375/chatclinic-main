'use client'
import type { FC, ComponentProps } from 'react'
import { Box } from '@chakra-ui/react'

export const Form: FC<ComponentProps<'form'>> = (props) => {
  return (
    <Box w='full' maxW='sm' bgColor='white' rounded='2xl' px={5} py={6}>
      <form {...props} />
    </Box>
  )
}
