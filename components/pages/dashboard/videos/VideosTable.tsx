'use client'
import type { FC } from 'react'
import { Td, Tr, Text, Icon, Grid, GridItem, Link } from '@chakra-ui/react'
import { HiTrash } from '@react-icons/all-files/hi/HiTrash'
import { useVideos } from '@/hooks'
import { Tooltip } from '@/components/common'
import { DashboardTable, DashboardTableLoading } from '@/components/dashboard'
import { SecondaryIconButton } from '@/components/buttons'
import type { Video, PaginateProps } from '@/types'

export const VideosTable: FC<{
  videos: Video[] | undefined
  paginate: PaginateProps
}> = ({ videos, paginate }) => {
  const title = 'All Videos'
  const columns = ['URL', 'Added', 'Actions']
  const sharedProps = { title, columns }

  if (!videos) return <DashboardTableLoading {...sharedProps} />

  return (
    <DashboardTable {...{ paginate }} {...sharedProps}>
      {videos.map((video) => (
        <VideoRow key={`tr-${video._id}`} {...{ video }} />
      ))}
    </DashboardTable>
  )
}

const VideoRow: FC<{ video: Video }> = ({ video }) => {
  const { deleteVideo, deleteVideoLoading } = useVideos()

  return (
    <Tr>
      <Td>
        <Text>
          <Link href={video.url} target='_blank' color='primary.700'>
            {video.url}
          </Link>
        </Text>
      </Td>
      <Td>
        <Text>{new Date(video.createdAt).toLocaleDateString()}</Text>
      </Td>
      <Td minW={{ base: '0px', lg: '200px' }}>
        <Grid autoFlow='column' justifyContent='start' columnGap={2}>
          <GridItem>
            <Tooltip label='Remove Video'>
              <SecondaryIconButton
                size='sm'
                icon={<Icon as={HiTrash} />}
                aria-label='Remove Video'
                onClick={() => deleteVideo(video._id)}
                isLoading={deleteVideoLoading}
              />
            </Tooltip>
          </GridItem>
        </Grid>
      </Td>
    </Tr>
  )
}
