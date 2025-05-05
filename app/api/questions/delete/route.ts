import {
  dbConnect,
  getUnauthenticatedResponse,
  PineconeUtils,
  Questions,
  UserUtils
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'
import type { APIResponse, Question } from '@/types'

export const dynamic = 'force-dynamic'

export async function DELETE(req: Request) {
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

    const { questionId } = (await req.json()) as { questionId?: string }

    if (!questionId) throw new Error('No questionId provided in body')

    const pinecone = new PineconeUtils(user)
    const deletedVectors = await pinecone.deleteQuestionVectors(questionId)

    if (!deletedVectors) throw new Error('Could not delete question vectors')

    const question = await Questions.findOneAndDelete<Question>({
      user: user._id,
      _id: questionId
    })

    if (!question) throw new Error('Deletion not acknowledged')

    const apiResponse: APIResponse<{ question: Question }> = {
      success: true,
      notification: {
        type: 'success',
        title: 'Question Deleted',
        description: 'Successfully deleted the question from your question bank'
      },
      question
    }

    return new Response(JSON.stringify(apiResponse), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/question/delete error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
