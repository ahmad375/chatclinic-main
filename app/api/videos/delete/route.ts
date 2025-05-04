import {
  dbConnect,
  getUnauthenticatedResponse,
  UserUtils,
  PineconeUtils,
  Videos
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Video } from '@/types'

export const dynamic = 'force-dynamic'

export async function DELETE(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()
    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/videos')),
        {
          status: 200
        }
      )

    const { videoId } = (await req.json()) as { videoId?: string }

    if (!videoId) throw new Error('No videoId provided in body')

    const pinecone = new PineconeUtils(user)
    const deletedVectors = await pinecone.deleteVideoVectors(videoId)
    if (!deletedVectors) throw new Error('Could not delete video vectors')

    const video = await Videos.findOneAndDelete<Video>({
      user: user._id,
      _id: videoId
    })

    if (!video) throw new Error('Deletion not acknowledged')

    if (!video.value) {
      return new Response(JSON.stringify({
        success: false,
        notification: {
          type: 'error',
          title: 'Not Found',
          description: 'The video could not be found or deleted'
        }
      }), {
        status: 404
      })
    }

    const apiResponse: APIResponse<{ video: Video }> = {
      success: true,
      notification: {
        type: 'success',
        title: 'Video Removed',
        description: 'Successfully removed the video'
      },
      video: video.value // Extract the video from .value
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/videos/delete error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
