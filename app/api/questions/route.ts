import {
  dbConnect,
  Questions,
  getPageParam,
  getUnauthenticatedResponse,
  UserUtils
} from '@/server'
import { PageLimit, UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Question } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(getUnauthenticatedResponse('/dashboard/questions')),
        {
          status: 200
        }
      )

    const page = getPageParam(req)

    const q = () =>
      Questions.find<Question>({
        user: user._id
      })

    const totalQuestions = await q().countDocuments()

    const questions = await q()
      .sort({
        createdAt: 'desc'
      })
      .skip((page - 1) * PageLimit)
      .limit(PageLimit)

    const apiResponse: APIResponse<{
      questions: Question[]
      totalQuestions: number
    }> = {
      success: true,
      questions,
      totalQuestions
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/questions error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
