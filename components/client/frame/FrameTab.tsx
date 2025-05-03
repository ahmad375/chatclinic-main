'use client'
import type { FC, PropsWithChildren } from 'react'
import { Grid, GridItem, Icon, Text, type As } from '@chakra-ui/react'
import { useFrame, useFrameRouter } from '@/hooks'

export const FrameTab: FC<
  PropsWithChildren<{ icon: As; path: string; catchAll?: boolean }>
> = ({ children, icon, path, catchAll }) => {
  const {
    state: { user }
  } = useFrame()
  const { pathname, push } = useFrameRouter()
  const active = catchAll ? pathname.startsWith(path) : pathname === path

  return (
    <Grid
      autoFlow='row'
      justifyContent='center'
      textAlign='center'
      cursor='pointer'
      bgColor='white'
      color={active ? user.widgetTheme.primaryColor : 'black'}
      userSelect='none'
      pointerEvents={active ? 'none' : 'all'}
      onClick={() => push(path)}
      py={4}
    >
      <GridItem>
        <Icon as={icon} fontSize='xl' />
      </GridItem>
      <GridItem>
        <Text fontSize='sm' fontWeight={500}>
          {children}
        </Text>
      </GridItem>
    </Grid>
  )
}
