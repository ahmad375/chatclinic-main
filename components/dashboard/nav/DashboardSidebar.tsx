'use client'
import type { FC } from 'react'
import { usePathname } from 'next/navigation'
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import {
  HiHome,
  HiDatabase,
  HiQuestionMarkCircle,
  HiDocument,
  HiGlobe,
  HiCode,
  HiCreditCard,
  HiUser,
  HiCog,
  HiLogout,
  HiChartPie,
  HiPlay,
  HiArrowCircleUp
} from 'react-icons/hi'
import { IoMdChatboxes } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { RiTicket2Line } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import { useDashboard } from '@/hooks'
import { Plan } from '@/enums'
import { Logo } from '@/components/common'
import { DashboardSidebarOption, DashboardSidebarOptionGroup } from '.'

export const DashboardSidebar: FC = () => {
  const pathname = usePathname()
  const {
    state: { user }
  } = useDashboard()

  return (
    <Flex
      flexDir='column'
      justifyContent='space-between'
      w='full'
      minH='full'
      px={4}
    >
      <Grid autoFlow='row' rowGap={2}>
        <GridItem>
          <Grid
            templateColumns='0fr 1fr'
            columnGap={3}
            alignItems='center'
            h={20}
            px={5}
          >
            <Logo />
          </Grid>
        </GridItem>
        <GridItem>
          <DashboardSidebarOption paths={['/dashboard']} icon={HiHome}>
            Dashboard
          </DashboardSidebarOption>
        </GridItem>
        <GridItem>
          <DashboardSidebarOption
            paths={['/dashboard/messages']}
            icon={IoMdChatboxes}
            catchAll
          >
            Messages
          </DashboardSidebarOption>
        </GridItem>
        <GridItem>
          <DashboardSidebarOption
            paths={['/dashboard/tickets']}
            icon={RiTicket2Line}
            // badge='Beta'
            catchAll
          >
            Tickets
          </DashboardSidebarOption>
        </GridItem>
        <GridItem>
          <DashboardSidebarOptionGroup
            id='data-sources'
            icon={HiDatabase}
            options={[
              {
                paths: ['/dashboard/questions'],
                icon: HiQuestionMarkCircle,
                catchAll: true,
                children: 'Question Bank'
              },
              {
                paths: ['/dashboard/documents'],
                icon: HiDocument,
                catchAll: true,
                children: 'Documents'
              },
              {
                paths: ['/dashboard/pages'],
                icon: HiGlobe,
                catchAll: true,
                children: 'Pages'
              },
              {
                paths: ['/dashboard/videos'],
                icon: HiPlay,
                catchAll: true,
                children: 'Videos',
                badge: 'New'
              }
            ]}
          >
            Data Sources
          </DashboardSidebarOptionGroup>
        </GridItem>
        {/* <GridItem>
          <DashboardSidebarOption
            paths={['/dashboard/teams']}
            icon={TbUsers}
            catchAll
          >
            Teams
          </DashboardSidebarOption>
        </GridItem> */}
        <GridItem>
          <DashboardSidebarOption paths={['/dashboard/widget']} icon={HiCode}>
            Widget
          </DashboardSidebarOption>
        </GridItem>
        <GridItem>
          <DashboardSidebarOptionGroup
            id='settings'
            icon={HiCog}
            options={[
              {
                paths: ['/dashboard/profile'],
                icon: HiUser,
                children: 'Profile'
              },
              {
                paths: ['/dashboard/usage'],
                icon: HiChartPie,
                children: 'Usage'
              },
              {
                paths: ['/dashboard/billing'],
                icon: HiCreditCard,
                children: 'Billing',
                catchAll: true
              }
            ]}
          >
            Settings
          </DashboardSidebarOptionGroup>
        </GridItem>
        <GridItem>
          <DashboardSidebarOption
            icon={BiSupport}
            onClick={() => window.open('mailto:hello@chatclinicai.com')}
          >
            Support
          </DashboardSidebarOption>
        </GridItem>
      </Grid>
      <Grid autoFlow='row' rowGap={2}>
        <GridItem />
        {((pathname !== '/dashboard/billing' && user.plan === Plan.Free) ||
          user.plan === Plan.Pro) && (
          <GridItem>
            <DashboardSidebarOption
              icon={HiArrowCircleUp}
              paths={['/dashboard/billing']}
            >
              Upgrade to {user.plan === Plan.Free ? Plan.Pro : Plan.Enterprise}
            </DashboardSidebarOption>
          </GridItem>
        )}
        <GridItem>
          <DashboardSidebarOption icon={HiLogout} paths={['/logout']}>
            Log Out
          </DashboardSidebarOption>
        </GridItem>
        <GridItem>
          <Box h={2} />
        </GridItem>
      </Grid>
    </Flex>
  )
}
