'use client'
import type { FC, PropsWithChildren } from 'react'
import { Box, Grid, GridItem, Text, Skeleton, Flex } from '@chakra-ui/react'

export const DashboardSectionItem: FC<
  PropsWithChildren<{ title: string; loading?: boolean }>
> = ({ title, loading, children }) => {
  return (
    <Box pt={6} color='black'>
      <Grid
        autoFlow='row'
        rowGap={2}
        px={4}
        py={4}
        bgColor='white'
        rounded='xl'
        shadow='base'
      >
        <GridItem>
          <Text fontWeight={400} color='secondary.700'>
            {title}
          </Text>
        </GridItem>
        <GridItem>
          <Flex minH={16} py={3} alignItems='center'>
            {loading && <Skeleton w={16} h={8} rounded='lg' />}
            {!loading && children}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}
