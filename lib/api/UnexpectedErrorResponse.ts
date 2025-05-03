import type { APIResponse } from '@/types'
import { UnexpectedErrorNotification } from '..'

export const UnexpectedErrorResponse: APIResponse = {
  success: false,
  notification: UnexpectedErrorNotification
}
