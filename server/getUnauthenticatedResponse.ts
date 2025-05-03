import { UnauthenticatedResponse } from '@/lib'
import type { APIResponse } from '@/types'

export const getUnauthenticatedResponse = (
  restorePath: string
): APIResponse => {
  return {
    ...UnauthenticatedResponse,
    nextPath: `/login?next=${encodeURIComponent(restorePath)}`
  }
}
