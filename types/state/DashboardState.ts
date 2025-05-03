import type { Document, Page, Question, Ticket, User, Video, LiveChat } from '..'

export interface DashboardState {
  user: User

  documents: Document[] | undefined
  totalDocuments: number
  document: Document | undefined

  tickets: Ticket[] | undefined
  totalTickets: number
  ticket: Ticket | undefined

  questions: Question[] | undefined
  totalQuestions: number
  question: Question | undefined

  pages: Page[] | undefined
  totalPages: number

  videos: Video[] | undefined
  totalVideos: number

  // modals
  newPageModal: boolean
  newVideoModal: boolean
  subscribeModal: boolean
  cancelModal: boolean

  selectedTitle: string

  liveChats: LiveChat[] | undefined
  
  activeLiveChat: LiveChat | undefined
}
