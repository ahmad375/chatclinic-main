import {
  dbConnect,
  UserUtils,
  getUnauthenticatedResponse,
  Paywall
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, UsageLimits } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/usage')),
        {
          status: 200
        }
      )

    const paywall = new Paywall(user)

    const totalMessages = await paywall.getTotalMessages()
    const totalThreads = await paywall.getTotalThreads()
    const totalQuestions = await paywall.getTotalQuestions()
    const totalDocuments = await paywall.getTotalDocuments()
    const totalPages = await paywall.getTotalPages()
    const totalVideos = await paywall.getTotalVideos()

    const {
      messageLimit,
      questionLimit,
      documentLimit,
      pageLimit,
      videoLimit
    } = paywall

    const apiResponse: APIResponse<UsageLimits> = {
      success: true,

      totalMessages,
      totalThreads,
      totalQuestions,
      totalDocuments,
      totalPages,
      totalVideos,

      messageLimit,
      questionLimit,
      documentLimit,
      pageLimit,
      videoLimit
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/user/limits error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
