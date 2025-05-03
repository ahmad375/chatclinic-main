import type { Message as AIMessage } from 'ai'
import { MessageRole } from '@/enums'
import type { Message } from '@/types'

export const messagesToAIMessages = (messages: Message[]): AIMessage[] => {
  return messages
    .filter((message) => !!message.content)
    .map((message) => ({
      id: message._id.toString(),
      role: message.role === MessageRole.User ? 'user' : 'assistant',
      content: message.content!
    }))
}
