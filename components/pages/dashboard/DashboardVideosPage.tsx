'use client'
import { useEffect, type FC } from 'react'
import { useDashboard, usePaginate, useVideos } from '@/hooks'
import { DashboardSectionTitle } from '@/components/dashboard'
import { EmptyVideos, VideosTable } from './videos'

export const DashboardVideosPage: FC = () => {
  const {
    dispatch,
    state: { videos, totalVideos }
  } = useDashboard()
  const { fetchVideos } = useVideos()
  const { page } = usePaginate()

  useEffect(() => {
    fetchVideos(page)
  }, [page])

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Videos'}
    })
  },[])

  useEffect(() => {
    dispatch({
      type: 'SET_VIDEOS',
      payload: {
        videos: undefined,
        totalVideos: 0
      }
    })
  }, [page])

  return (
    <>
      <DashboardSectionTitle
        primaryButton={{
          children: 'New Video',
          onClick() {
            dispatch({
              type: 'SET_NEW_VIDEO_MODAL',
              payload: true
            })
          }
        }}
      >
        {/* Videos */}
      </DashboardSectionTitle>
      {videos && videos.length === 0 && <EmptyVideos />}
      {(!videos || videos.length > 0) && (
        <VideosTable
          {...{
            videos,
            paginate: {
              total: totalVideos,
              current: videos ? videos.length : 0,
              page
            }
          }}
        />
      )}
    </>
  )
}
