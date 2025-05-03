import type { Page, Document, Question, Video } from '..'

export interface MessageAnnotations {
  // snapshot of document (as it can be updated)
  document?: Document
  // snapshot of page (cannot be updated)
  page?: Page
  // snapshot of question (it cannot be updated anyway)
  question?: Question
  // snapshot of video (it cannot be updated anyway)
  video?: Video
}
