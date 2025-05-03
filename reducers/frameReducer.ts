import type { FrameState, FrameAction } from '@/types'

export const frameReducer = (
  state: FrameState,
  action: FrameAction
): FrameState => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.payload
      }
    case 'TOGGLE_ACTIVE':
      return {
        ...state,
        active: !state.active
      }
    case 'SET_INITIAL_MESSAGES':
      return {
        ...state,
        initialMessages: action.payload,
        pageLoading: false
      }
    case 'ADD_INITIAL_MESSAGES':
      return {
        ...state,
        initialMessages: [
          ...action.payload.messages,
          ...(state.initialMessages || [])
        ],
        noMoreMessages: action.payload.noMoreMessages
      }
    case 'SET_PAGE_LOADING':
      return {
        ...state,
        pageLoading: action.payload
      }
    case 'SET_ANNOTATED_MESSAGES':
      return {
        ...state,
        annotatedMessages: action.payload
      }
    case 'SET_INITIAL_LIVECHATS':
      return {
        ...state,
        liveChats: action.payload,
        pageLoading: false
      }
    case 'ADD_LIVECHATS':
      return {
        ...state,
        liveChats: [
          ...state.liveChats,
          action.payload],
        pageLoading: false
      }
    default:
      return state
  }
}
