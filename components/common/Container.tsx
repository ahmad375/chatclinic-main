'use client'
import type { FC } from 'react'
import { Container as __Container, type ContainerProps } from '@chakra-ui/react'

export const Container: FC<ContainerProps> = (props) => {
  return <__Container maxW='container.xl' {...props} />
}
