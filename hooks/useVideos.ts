'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UnexpectedErrorNotification } from '@/lib'
import type { Video } from '@/types'
import { useAPI, useNotification, useDashboard } from '.'

export const useVideos = (): {
  fetchVideos: (page: number) => Promise<void>

  newVideoLoading: boolean
  newVideo: (url: string) => Promise<void>

  deleteVideoLoading: boolean
  deleteVideo: (videoId: Video['_id']) => Promise<void>
} => {
  const [newVideoLoading, setNewVideoLoading] = useState(false)
  const [deleteVideoLoading, setDeleteVideoLoading] = useState(false)

  const { push } = useRouter()
  const { dispatch } = useDashboard()
  const { request } = useAPI()
  const { setNotification } = useNotification()

  const fetchVideos = async (page: number) => {
    const apiResponse = await request<{
      videos?: Video[]
      totalVideos?: number
    }>(`/api/videos?page=${encodeURIComponent(page)}`, {
      withMinimumDelay: true
    })

    if (apiResponse.videos && apiResponse.totalVideos !== undefined) {
      dispatch({
        type: 'SET_VIDEOS',
        payload: {
          videos: apiResponse.videos,
          totalVideos: apiResponse.totalVideos
        }
      })
    }
  }

  return {
    newVideoLoading,
    deleteVideoLoading,
    fetchVideos,
    async newVideo(url) {
      try {
        if (newVideoLoading) return

        setNewVideoLoading(true)

        const apiResponse = await request<{ video?: Video }>(
          '/api/videos/new',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url }),
            setIsLoading: setNewVideoLoading
          }
        )

        if (apiResponse.video) {
          dispatch({
            type: 'SET_NEW_VIDEO_MODAL',
            payload: false
          })
          push('/dashboard/videos')
          dispatch({
            type: 'SET_VIDEOS',
            payload: {
              videos: undefined,
              totalVideos: 0
            }
          })
          await fetchVideos(1)
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setNewVideoLoading(false)
      }
    },
    async deleteVideo(videoId) {
      try {
        if (deleteVideoLoading) return

        setDeleteVideoLoading(true)

        const apiResponse = await request<{ video?: Video }>(
          '/api/videos/delete',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              videoId
            }),
            setIsLoading: setDeleteVideoLoading
          }
        )

        if (apiResponse.video) {
          push('/dashboard/videos')
          dispatch({
            type: 'SET_VIDEOS',
            payload: {
              videos: undefined,
              totalVideos: 0
            }
          })
          await fetchVideos(1)
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setDeleteVideoLoading(false)
      }
    }
  }
}
