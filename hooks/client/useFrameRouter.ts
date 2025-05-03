import { usePathname, useRouter } from 'next/navigation'
import { useFrame } from '.'

export const useFrameRouter = (): {
  pathname: string
  push: (path: string) => void
  replace: (path: string) => void
  back: () => void
} => {
  const pathname = usePathname()
  const { push, replace, back } = useRouter()
  const {
    state: {
      user: { clientId },
      thread
    },
    dispatch
  } = useFrame()

  const getModifiedPathName = (path: string): string => {
    return clientId ? `/client/${clientId}/${thread}/${path}` : path
  }

  const setPageLoading = (pageLoading: boolean): void =>
    dispatch({
      type: 'SET_PAGE_LOADING',
      payload: pageLoading
    })

  return {
    pathname: pathname.replace(`/client/${clientId}/${thread}`, ''),
    push(path) {
      setPageLoading(true)
      push(getModifiedPathName(path))
    },
    replace(path) {
      setPageLoading(true)
      replace(getModifiedPathName(path))
    },
    back
  }
}
