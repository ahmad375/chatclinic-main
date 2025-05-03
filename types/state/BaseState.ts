import type { User } from '..'

export interface BaseState {
  active: boolean
  user: User
  // thread uuid
  thread: string
}
