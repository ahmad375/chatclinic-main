'use client'
import { useEffect, type FC, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { DashboardSectionTitle } from '@/components/dashboard'
import { useAPI } from '@/hooks'
import type { UsageLimits } from '@/types'
import { UsageStat } from './usage'
import { useDashboard } from '@/hooks'

export const DashboardUsagePage: FC = () => {
  const [usageLimits, setUsageLimits] = useState<UsageLimits | undefined>(
    undefined
  )
  const {dispatch} = useDashboard()
  const { request } = useAPI()

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Usage'}
    })
  },[])

  useEffect(() => {
    ;(async () => {
      const limitsRequest = await request<UsageLimits>('/api/user/limits', {
        method: 'GET'
      })
      if (limitsRequest.success) setUsageLimits(limitsRequest)
    })()
  }, [])

  return (
    <>
      {/* <DashboardSectionTitle>Usage</DashboardSectionTitle> */}
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        columnGap={6}
      >
        <GridItem>
          <UsageStat
            unit='message'
            total={usageLimits?.totalMessages}
            limit={usageLimits?.messageLimit}
          />
        </GridItem>
        <GridItem>
          <UsageStat
            unit='thread'
            total={usageLimits?.totalThreads}
            limit='∞'
          />
        </GridItem>
        <GridItem>
          <UsageStat
            unit='question'
            total={usageLimits?.totalQuestions}
            limit={usageLimits?.questionLimit}
          />
        </GridItem>
        <GridItem>
          <UsageStat
            unit='document'
            total={usageLimits?.totalDocuments}
            limit={usageLimits?.documentLimit}
          />
        </GridItem>
        <GridItem>
          <UsageStat
            unit='page'
            total={usageLimits?.totalPages}
            limit={usageLimits?.pageLimit}
          />
        </GridItem>
        <GridItem>
          <UsageStat
            unit='video'
            total={usageLimits?.totalVideos}
            limit={usageLimits?.videoLimit}
          />
        </GridItem>
      </Grid>
    </>
  )
}
