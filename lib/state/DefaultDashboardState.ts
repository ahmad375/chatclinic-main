import type { User, DashboardState } from '@/types'

export const DefaultDashboardState: DashboardState = {
  user: null as unknown as User,

  documents: undefined,
  totalDocuments: 0,
  document: undefined,

  tickets: undefined,
  totalTickets: 0,
  ticket: undefined,

  questions: undefined,
  totalQuestions: 0,
  question: undefined,

  pages: undefined,
  totalPages: 0,

  videos: undefined,
  totalVideos: 0,

  newPageModal: false,
  newVideoModal: false,
  subscribeModal: false,
  cancelModal: false,

  selectedTitle: 'Dashboard',

  liveChats: [],

  activeLiveChat: undefined
}
