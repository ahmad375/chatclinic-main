import { signIn, type SignInResponse } from 'next-auth/react'
import { UnexpectedErrorNotification } from '@/lib'
import type { Notification } from '@/types'
import { useNotification } from '.'

export const useSignInResponseHandler = (): {
  signInResponseHandler: (
    signInResponse: SignInResponse | undefined,
    success: Notification
  ) => void
} => {
  const { setNotification } = useNotification()

  return {
    signInResponseHandler(signInResponse, success) {
      try {
        if (signInResponse?.ok) {
          setNotification(success)
        } else if (signInResponse?.error) {
          setNotification({
            type: 'error',
            title: signInResponse.error
          })
        } else {
          // Show a general error
          throw new Error()
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      }
    }
  }
}
