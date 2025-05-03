import type { ChatCompletionCreateParams } from 'openai/resources/chat/index'
import { Function } from '@/enums'

export const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: Function.SearchKnowledgeBase,
    description: 'search company knowledge base to answer a customer inquiry',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'query string'
        }
      },
      required: ['query']
    }
  },
  {
    name: Function.FileSupportTicket,
    description: 'file a support ticket',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            "ask for the customer's name before submitting the support ticket"
        },
        email: {
          type: 'string',
          description:
            "ask for the customer's email before submitting the support ticket, required so we can contact the customer."
        },
        details: {
          type: 'string',
          description: 'details about the support ticket'
        }
      },
      required: ['name','email', 'details']
    }
  }
]
