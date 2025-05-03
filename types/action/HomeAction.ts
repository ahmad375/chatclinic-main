import type { HomeContext } from '..'

export type HomeAction = {
  type: 'SET_USER'
  payload: HomeContext['state']['user']
}
