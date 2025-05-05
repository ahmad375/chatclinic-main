'use client'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Icon, Flex, Box, type As, Badge } from '@chakra-ui/react'

export type DashboardSidebarOptionProps = PropsWithChildren<{
  icon: As
  paths?: string[]
  onClick?: Function
  catchAll?: boolean
  badge?: ReactNode
}>

export const DashboardSidebarOption: FC<DashboardSidebarOptionProps> = ({
  icon,
  paths,
  onClick,
  catchAll,
  badge,
  children
}) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const active =
    paths &&
    paths.length &&
    (catchAll ? pathname.startsWith(paths[0]) : paths.includes(pathname))
  const hardActive = paths && paths.length && paths[0] === pathname

  return (
    <Box>
      <Flex
        w='full'
        h={10}
        px={2}
        alignItems='center'
        rounded='lg'
        bgColor={active ? 'whiteAlpha.200' : 'transparent'}
        color='white'
        cursor='pointer'
        fontWeight={500}
        fontSize='md'
        userSelect='none'
        pointerEvents={hardActive ? 'none' : 'all'}
        _hover={active ? undefined : { bgColor: 'whiteAlpha.100' }}
        _active={{ bgColor: 'whiteAlpha.200' }}
        onClick={() => {
          if (paths && paths.length) {
            push(paths[0])
          } else if (onClick) {
            onClick()
          }
        }}
      >
        <Flex w={10} h={10} justifyContent='center' alignItems='center'>
          <Icon as={icon} fontSize='xl' />
        </Flex>
        {children}
        {badge && (
          <>
            &nbsp;&nbsp;
            <Badge
              size='sm'
              rounded='full'
              colorScheme='purple'
              textTransform='none'
              fontWeight={500}
              px={2}
            >
              {badge}
            </Badge>
          </>
        )}
      </Flex>
    </Box>
  )
}
