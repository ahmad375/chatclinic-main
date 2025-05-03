import type { DashboardContext, Document, Question, User, LiveChat } from '..'

export type DashboardAction =
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | {
      type: 'SET_DOCUMENTS'
      payload: {
        documents: DashboardContext['state']['documents']
        totalDocuments: DashboardContext['state']['totalDocuments']
      }
    }
  | { type: 'ADD_DOCUMENT'; payload: Document }
  | { type: 'REMOVE_DOCUMENT'; payload: Document['_id'] }
  | {
      type: 'SET_TICKETS'
      payload: {
        tickets: DashboardContext['state']['tickets']
        totalTickets: DashboardContext['state']['totalTickets']
      }
    }
  | { type: 'SET_TICKET'; payload: DashboardContext['state']['ticket'] }
  | { type: 'SET_DOCUMENT'; payload: DashboardContext['state']['document'] }
  | {
      type: 'UPDATE_DOCUMENT'
      payload: Partial<DashboardContext['state']['document']>
    }
  | {
      type: 'SET_QUESTIONS'
      payload: {
        questions: DashboardContext['state']['questions']
        totalQuestions: DashboardContext['state']['totalQuestions']
      }
    }
  | { type: 'REMOVE_QUESTION'; payload: Question['_id'] }
  | { type: 'SET_QUESTION'; payload: DashboardContext['state']['question'] }
  | {
      type: 'SET_PAGES'
      payload: {
        pages: DashboardContext['state']['pages']
        totalPages: DashboardContext['state']['totalPages']
      }
    }
  | {
      type: 'SET_NEW_PAGE_MODAL'
      payload: DashboardContext['state']['newPageModal']
    }
  | {
      type: 'SET_NEW_VIDEO_MODAL'
      payload: DashboardContext['state']['newVideoModal']
    }
  | {
      type: 'SET_SUBSCRIBE_MODAL'
      payload: DashboardContext['state']['subscribeModal']
    }
  | {
      type: 'SET_CANCEL_MODAL'
      payload: DashboardContext['state']['cancelModal']
    }
  | {
      type: 'SET_VIDEOS'
      payload: {
        videos: DashboardContext['state']['videos']
        totalVideos: DashboardContext['state']['totalVideos']
      }
    }
  | {
      type: 'SET_TITLE'
      payload: {
        selectedTitle: DashboardContext['state']['selectedTitle']
      }
    }
  | {
      type: 'SET_INITIAL_LIVECHATS'
      payload: DashboardContext['state']['liveChats']
    }
  | {
      type: 'SET_ACTIVE_LIVECHAT'
      payload: DashboardContext['state']['activeLiveChat']
    }
  | {
      type: 'ADD_NEW_MESSAGE_TO_ACTIVE_LIVECHAT'
      payload: LiveChat['messages'][number]
    }
  | {
      type: 'ADD_NEW_MESSAGE_TO_LIVECHATS'
      payload: LiveChat['messages'][number]
    }
  | {
    type: 'ADD_NEW_MESSAGE_TO_LIVECHATS_NOT_ACTIVE'
    payload: {
      message: LiveChat['messages'][number],
      thread: string
    }
  }
  | {
    type: 'ADD_NEW_LIVECHAT_TO_LIVECHATS'
    payload: LiveChat
  }