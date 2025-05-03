import type { HomeState, HomeAction } from '@/types'

export const homeReducer = (
  state: HomeState,
  action: HomeAction
): HomeState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
