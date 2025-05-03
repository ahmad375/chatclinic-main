import {
  dbConnect,
  Questions,
  getUnauthenticatedResponse,
  UserUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Question } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(
  _: Request,
  { params: { questionId } }: { params: { questionId: string } }
) {
  try {
    await dbConnect()

    const user = await UserUtils.getAuthenticatedUser()

    if (!user)
      return new Response(
        JSON.stringify(
          getUnauthenticatedResponse(`/dashboard/questions/${questionId}`)
        ),
        {
          status: 200
        }
      )

    const question = await Questions.findOne<Question>({
      user: user._id,
      _id: questionId
    })

    if (!question) {
      const notFoundAPIResponse: APIResponse = {
        success: false,
        notification: {
          type: 'error',
          title: 'Question Not Found',
          description: 'The question you are looking for does not exist'
        },
        nextPath: '/dashboard/questions'
      }
      return new Response(JSON.stringify(notFoundAPIResponse), {
        status: 200
      })
    }

    const apiResponse: APIResponse<{
      question: Question
    }> = {
      success: true,
      question
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/questions/[questionId] error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
