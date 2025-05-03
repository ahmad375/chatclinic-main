'use client'
import { useToast } from '@chakra-ui/react'
import type { Notification } from '@/types'

export const useNotification = (): {
  setNotification: (notification: Notification) => void
} => {
  const toast = useToast()

  return {
    setNotification(notification) {
      const id = encodeURIComponent(
        `${notification.type}-${notification.title}`
      )
      if (!toast.isActive(id))
        toast({
          id,
          title: notification.title,
          description: notification.description,
          status: notification.type,
          duration: 2500,
          isClosable: true,
          position: 'top'
        })
    }
  }
}
