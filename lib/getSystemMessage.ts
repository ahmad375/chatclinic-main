import type { ChatCompletionMessageParam } from 'openai/resources/chat/index'
import type { GetSystemMessageOptions } from '@/types'

export const getSystemMessage =
  ({}: GetSystemMessageOptions): ChatCompletionMessageParam => ({
    role: 'system',
    content:
      'You are an A.I. support chatbot. Always keep the conversation centered around how you can help the customer, by either answering a question or providing support.'
  })
