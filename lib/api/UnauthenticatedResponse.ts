import type { APIResponse } from '@/types'
import { UnauthenticatedErrorNotification } from '..'

export const UnauthenticatedResponse: APIResponse = {
  success: false,
  notification: UnauthenticatedErrorNotification
}
