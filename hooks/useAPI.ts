import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import {
  UnexpectedErrorNotification,
  UnexpectedErrorResponse,
  withMinimumDelay
} from '@/lib'
import type { APIResponse } from '@/types'
import { useNotification } from './useNotification'

/**
 * This hook handles showing notifications and redirecting
 * (if necessary) to log in or next path/url
 */

type RequestOptions<T> = RequestInit & {
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  // consumes api response before it is returned
  callback?: (apiResponse: APIResponse<T>) => Promise<boolean>
  withMinimumDelay?: boolean
}

export const useAPI = (): {
  request: <T>(
    url: string,
    options: RequestOptions<T>
  ) => Promise<APIResponse<T>>
} => {
  const { push, refresh } = useRouter()
  const { setNotification } = useNotification()

  return {
    async request<T>(
      url: string,
      options: RequestOptions<T>
    ): Promise<APIResponse<T>> {
      try {
        if (options.setIsLoading) options.setIsLoading(true)

        const f = () => fetch(url, options)

        const res = await (options.withMinimumDelay ? withMinimumDelay(f) : f())

        if (res.status === 200) {
          const apiResponse = (await res.json()) as APIResponse<T>

          if (options.callback) {
            const callbackResponse = await options.callback(apiResponse)
            if (!callbackResponse) throw new Error()
          }

          if (apiResponse.notification)
            setNotification(apiResponse.notification)

          if (apiResponse.nextPath) push(apiResponse.nextPath)
          if (apiResponse.nextUrl) {
            await new Promise((r) => setTimeout(r, 2000))
            window.open(apiResponse.nextUrl)
          }
          if (apiResponse.refresh) refresh()

          return apiResponse
        } else {
          throw new Error(`Bad status in request (${res.status})`)
        }
      } catch (e) {
        console.log(`useAPI.request error: ${e}`)
        // still need to handle notification
        setNotification(UnexpectedErrorNotification)
        return UnexpectedErrorResponse as APIResponse<T>
      } finally {
        if (options.setIsLoading) options.setIsLoading(false)
      }
    }
  }
}
