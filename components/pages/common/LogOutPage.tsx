'use client'
import { useEffect, type FC } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Flex, Spinner } from '@chakra-ui/react'
import { useNotification } from '@/hooks'

export const LogOutPage: FC = () => {
  const { replace } = useRouter()
  const { setNotification } = useNotification()

  useEffect(() => {
    const timeout = setTimeout(() => {
      ;(async () => {
        await signOut({
          redirect: false
        })
        setNotification({
          type: 'success',
          title: 'Logged out',
          description: 'You have been logged out'
        })
        replace('https://chatclinicai.com')
      })()
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Flex
      w='100vw'
      h='100vh'
      maxH='fill-available'
      justifyContent='center'
      alignItems='center'
      bgColor='secondary.100'
    >
      <Spinner color='secondary.400' size='md' />
    </Flex>
  )
}
