import type { Notification } from '..'

export type APIResponse<T = {}> = T & {
  success: boolean
  notification?: Notification
  nextPath?: string
  nextUrl?: string
  refresh?: boolean
}
