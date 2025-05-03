import type { Message, LiveChat } from '..'
import type { BaseState } from './BaseState'

export interface FrameState extends BaseState {
  initialMessages: Message[] | undefined
  pageLoading: boolean
  annotatedMessages: Message[]
  noMoreMessages: boolean
  liveChats: LiveChat["messages"]
}
