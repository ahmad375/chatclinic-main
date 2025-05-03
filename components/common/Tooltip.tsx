'use client'
import type { FC } from 'react'
import { Tooltip as __Tooltip, Box, type TooltipProps } from '@chakra-ui/react'

export const Tooltip: FC<TooltipProps> = ({ children, ...props }) => {
  return (
    <__Tooltip
      bgColor='secondary.900'
      color='white'
      rounded='full'
      px={3}
      py={1}
      hasArrow
      {...props}
    >
      <Box display='inline-block'>{children}</Box>
    </__Tooltip>
  )
}
