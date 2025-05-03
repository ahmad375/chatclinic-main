'use client'
import type { FC } from 'react'
import { Grid, GridItem, Box } from '@chakra-ui/react'

export const MessageLoader: FC = () => {
  return (
    <Grid autoFlow='column' columnGap={1}>
      {new Array(3).fill(0).map((_, i) => (
        <GridItem key={`message-loader-${i}`}>
          <Box
            w={4}
            h={4}
            rounded='full'
            animation={`1s linear ${i * 25}s infinite pulse`}
          />
        </GridItem>
      ))}
    </Grid>
  )
}
