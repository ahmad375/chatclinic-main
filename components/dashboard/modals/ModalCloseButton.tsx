'use client'
import type { FC } from 'react'
import { ModalCloseButton as __ModalCloseButton } from '@chakra-ui/react'

export const ModalCloseButton: FC = () => (
  <__ModalCloseButton
    _hover={{ bgColor: 'secondary.100' }}
    _active={{ bgColor: 'secondary.200' }}
  />
)
