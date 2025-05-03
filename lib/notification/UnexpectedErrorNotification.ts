import type { Notification } from '@/types'
import { UnexpectedErrorText } from '../UnexpectedErrorText'

export const UnexpectedErrorNotification: Notification = {
  type: 'error',
  title: UnexpectedErrorText,
  description: 'If this error persists, please contact us.'
}
