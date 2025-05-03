'use client'
import type { FC, ReactNode } from 'react'
import {
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
  type ButtonProps,
  type As
} from '@chakra-ui/react'
import { PrimaryButton } from '../buttons'

export const DashboardEmptySection: FC<{
  icon: As
  title: ReactNode
  description: ReactNode
  action?: ButtonProps
}> = ({ icon, title, description, action }) => {
  return (
    <Grid autoFlow='row' rowGap={4} pt={12} textAlign='center'>
      <GridItem pb={2}>
        <Icon as={icon} fontSize={{ base: '9xl', lg: '156px' }} />
      </GridItem>
      <GridItem>
        <Heading size='lg' maxW='sm' mx='auto' color='secondary.900'>
          {title}
        </Heading>
      </GridItem>
      <GridItem>
        <Text fontSize='lg' maxW='sm' mx='auto' color='secondary.600'>
          {description}
        </Text>
      </GridItem>
      {action && (
        <GridItem pt={2}>
          <PrimaryButton rounded='lg' {...action} />
        </GridItem>
      )}
    </Grid>
  )
}
