'use client'
import { type FC, type PropsWithChildren } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box, Flex, Icon, type As, Grid, GridItem } from '@chakra-ui/react'
import { HiChevronDown } from 'react-icons/hi'
import { DashboardSidebarOption, type DashboardSidebarOptionProps } from '.'

export const DashboardSidebarOptionGroup: FC<
  PropsWithChildren<{
    id: string
    icon: As
    options: DashboardSidebarOptionProps[]
  }>
> = ({ id, children, icon, options }) => {
  const pathname = usePathname()

  const active = options
    .map((o) =>
      o.paths && o.paths.length
        ? o.catchAll
          ? pathname.startsWith(o.paths[0])
          : o.paths[0] === pathname
        : false
    )
    .includes(true)

  const { push } = useRouter()

  return (
    <Box>
      <Box>
        <Flex
          w='full'
          pos='relative'
          h={10}
          px={2}
          alignItems='center'
          rounded='lg'
          bgColor='transparent'
          color='white'
          cursor='pointer'
          fontWeight={500}
          fontSize='md'
          userSelect='none'
          //   pointerEvents={hardActive ? 'none' : 'all'}
          _hover={active ? undefined : { bgColor: 'whiteAlpha.100' }}
          _active={{ bgColor: 'whiteAlpha.200' }}
          onClick={() => {
            if (options.length && options[0].paths?.length)
              push(options[0].paths[0])
          }}
        >
          <Flex w={10} h={10} justifyContent='center' alignItems='center'>
            <Icon as={icon} fontSize='xl' />
          </Flex>
          {children}
          <Flex
            pos='absolute'
            right={0}
            w={10}
            h={10}
            justifyContent='center'
            alignItems='center'
            transform={active ? 'rotateZ(180deg)' : 'rotateZ(0deg)'}
          >
            <Icon as={HiChevronDown} fontSize='xl' />
          </Flex>
        </Flex>
      </Box>
      {active && (
        <Grid
          autoFlow='row'
          rowGap={2}
          pl={3}
          mt={2}
          ml={4}
          borderLeft='2px dashed'
          borderLeftColor='customGreen.800'
        >
          {options.map((option, i) => (
            <GridItem key={`group-${id}-option-${i}`}>
              <DashboardSidebarOption {...option} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  )
}
