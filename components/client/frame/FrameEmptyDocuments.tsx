'use client'
import type { FC } from 'react'
import { Grid, GridItem, Text, Icon } from '@chakra-ui/react'
import { FiAlertCircle } from '@react-icons/all-files/fi/FiAlertCircle'

export const FrameEmptyDocuments: FC = () => {
  return (
    <Grid
      autoFlow='row'
      placeContent='center'
      h='full'
      rowGap={4}
      textAlign='center'
      color='secondary.400'
    >
      <GridItem>
        <Icon as={FiAlertCircle} fontSize='5xl' />
      </GridItem>
      <GridItem>
        <Text fontSize='lg' fontWeight={500}>
          No Support Documents
        </Text>
      </GridItem>
    </Grid>
  )
}
