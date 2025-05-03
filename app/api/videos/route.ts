import {
  dbConnect,
  UserUtils,
  getPageParam,
  getUnauthenticatedResponse,
  Videos
} from '@/server'
import { PageLimit, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Video } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
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

    const page = getPageParam(req)

    const q = () =>
      Videos.find<Video>({
        user: user._id
      })

    const totalVideos = await q().countDocuments()

    const videos = await q()
      .sort({
        createdAt: 'desc'
      })
      .skip((page - 1) * PageLimit)
      .limit(PageLimit)

    const apiResponse: APIResponse<{
      videos: Video[]
      totalVideos: number
    }> = {
      success: true,
      videos,
      totalVideos
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/videos error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
