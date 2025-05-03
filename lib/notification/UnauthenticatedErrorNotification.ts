import type { Notification } from '@/types'

export const UnauthenticatedErrorNotification: Notification = {
  type: 'error',
  title: 'You are not logged in',
  description: 'Please log in to complete this request'
}
