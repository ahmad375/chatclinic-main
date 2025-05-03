import type { FrameContext, Message } from '..'
import type { BaseAction } from './BaseAction'

export type FrameAction =
  | BaseAction
  | { type: 'SET_PAGE_LOADING'; payload: FrameContext['state']['pageLoading'] }
  | {
      type: 'SET_INITIAL_MESSAGES'
      payload: FrameContext['state']['initialMessages']
    }
  | {
      type: 'ADD_INITIAL_MESSAGES'
      payload: {
        messages: Message[]
        noMoreMessages: FrameContext['state']['noMoreMessages']
      }
    }
  | {
      type: 'SET_ANNOTATED_MESSAGES'
      payload: FrameContext['state']['annotatedMessages']
    }
  | {
      type: 'SET_INITIAL_LIVECHATS'
      payload: FrameContext['state']['liveChats']
    }
  | {
      type: 'ADD_LIVECHATS'
      payload: FrameContext['state']['liveChats'][number]
    }
