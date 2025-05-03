'use client'
import type { FC, PropsWithChildren } from 'react'
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Header } from '../nav'

export const LegalHeader: FC<PropsWithChildren<{ lastUpdated: string }>> = ({
  children,
  lastUpdated
}) => {
  return (
    <Box className='pattern'>
      <Header isTransparent />
      <Grid
        autoFlow='row'
        rowGap={4}
        textAlign='center'
        py={{ base: 10, lg: 16 }}
        color='white'
      >
        <GridItem>
          <Heading>{children}</Heading>
        </GridItem>
        <GridItem>
          <Text fontSize='lg' color='customGreen.600'>
            Last updated on {lastUpdated}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  )
}
