'use client'
import { FormLabel, type FormLabelProps } from '@chakra-ui/react'
import type { FC } from 'react'

export const AccountFormLabel: FC<FormLabelProps> = (props) => {
  return <FormLabel color='secondary.800' {...props} />
}
