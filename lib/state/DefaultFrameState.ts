import type { FrameState } from '@/types'

export const DefaultFrameState: FrameState = {
  active: false,
  user: null as any,
  thread: '',
  initialMessages: undefined,
  liveChats: [],
  pageLoading: false,
  annotatedMessages: [],
  noMoreMessages: false
}
