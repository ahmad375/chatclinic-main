'use client'
import type { FC, PropsWithChildren } from 'react'
import { Box, Grid, GridItem, Divider } from '@chakra-ui/react'
import { FiMessageSquare } from '@react-icons/all-files/fi/FiMessageSquare'
import { FiHelpCircle } from '@react-icons/all-files/fi/FiHelpCircle'
import { Plan } from '@/enums'
import { useFrame } from '@/hooks'
import { FrameTab } from '@/components/client/frame'
import { FramePoweredBy } from './FramePoweredBy'
import { MdAccountCircle } from "react-icons/md";
import { TbRobotFace } from "react-icons/tb";
import { FcBusinessman } from "react-icons/fc";
import { MdOutlinePeopleAlt } from "react-icons/md";

export const FrameFooter: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { user }
  } = useFrame()

  return (
    <Box flexGrow={0} flexShrink={1} bgColor='white'>
      {children}
      <Divider orientation='horizontal' />
      <Grid autoFlow='row'>
        <GridItem>
          <Grid templateColumns='repeat(3, 1fr)'>
            <GridItem>
              <FrameTab icon={TbRobotFace} path='/frame'>
                Support
              </FrameTab>
            </GridItem>
            <GridItem>
              <FrameTab icon={FiHelpCircle} path='/frame/documents' catchAll>
                Help
              </FrameTab>
            </GridItem>
            <GridItem>
              <FrameTab icon={MdOutlinePeopleAlt} path='/frame/livechat' catchAll>
                Live Chat
              </FrameTab>
            </GridItem>
          </Grid>
        </GridItem>
        <Divider />
        {/* {user.plan !== Plan.Enterprise && <FramePoweredBy />} */}
        <FramePoweredBy />
      </Grid>
    </Box>
  )
}
