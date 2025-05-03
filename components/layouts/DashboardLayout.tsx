'use client'
import type { FC, PropsWithChildren } from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import type { User } from '@/types'
import { DashboardHeader, DashboardSidebar } from '../dashboard'
import { DashboardProvider } from '../providers'
import { DashboardModals } from '../dashboard'

export const DashboardLayout: FC<PropsWithChildren<{ user: User }>> = ({
  user,
  children
}) => {
  return (
    <DashboardProvider {...{ user }}>
      <Grid
        pos='relative'
        w='100vw'
        h='100vh'
        maxH='fill-available'
        templateColumns={{ base: '1fr', lg: '275px 1fr' }}
        bgColor='secondary.50'
      >
        <GridItem
          display={{ base: 'none', lg: 'block' }}
          w='full'
          h='full'
          bgColor='customGreen.900'
          // overflowY='scroll'
        >
          <DashboardSidebar />
        </GridItem>
        <GridItem h='full' overflowY='scroll'>
          <DashboardHeader />
          <Box px={{ base: 4, lg: 4 }} pb={0}>
            {children}
          </Box>
        </GridItem>
      </Grid>

      {/* Modals */}
      <DashboardModals />
    </DashboardProvider>
  )
}
