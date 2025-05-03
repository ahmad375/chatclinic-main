import {
  dbConnect,
  getUnauthenticatedResponse,
  Videos,
  UserUtils,
  PineconeUtils,
  Paywall
} from '@/server'
import { getURLMetadata, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Video } from '@/types'

export const dynamic = 'force-dynamic'
// Allow time for scraping of video content
export const maxDuration = 300

export async function POST(req: Request) {
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

    const paywall = new Paywall(user)
    const canCreateVideo = await paywall.canCreateVideo()
    if (!canCreateVideo.value)
      return new Response(
        JSON.stringify({
          success: false,
          notification: canCreateVideo.notification
        } as APIResponse),
        {
          status: 200
        }
      )

    const { url } = (await req.json()) as { url?: string }

    if (!url) throw new Error('No URL provided in body')

    const urlObj = new URL(url)
    const domain = urlObj.hostname

    if (!['youtube.com', 'www.youtube.com'].includes(domain))
      return new Response(
        JSON.stringify({
          success: false,
          notification: {
            type: 'error',
            title: 'Please only add URLs from youtube.com'
          }
        } as APIResponse),
        {
          status: 200
        }
      )

    const existingVideo = await Videos.findOne<Video>({
      user: user._id,
      url
    })

    if (existingVideo)
      return new Response(
        JSON.stringify({
          success: false,
          notification: {
            type: 'error',
            title: 'Duplicate Video',
            description: `You have already added a video with the URL "${url}"`
          }
        } as APIResponse),
        {
          status: 200
        }
      )

    const { title, description, image } = await getURLMetadata(url)

    const video = (await Videos.create<Video>({
      user: user._id,
      url,
      title,
      description,
      image
    })) as Video

    if (!video) throw new Error('No video created')

    const pinecone = new PineconeUtils(user)
    const vectorized = await pinecone.vectorizeVideo(video)

    if (!vectorized) {
      await Videos.deleteOne({
        user: user._id,
        _id: video._id
      })

      throw new Error('Could not vectorize video')
    }

    return new Response(
      JSON.stringify({
        success: true,
        notification: {
          type: 'success',
          title: 'Video Added',
          description: 'Successfully added a new video'
        },
        video,
        nextPath: '/dashboard/videos'
      } as APIResponse<{ video: Video }>),
      {
        status: 200
      }
    )
  } catch (e) {
    console.log(`/api/videos/new error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
