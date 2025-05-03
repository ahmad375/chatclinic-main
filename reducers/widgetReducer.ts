import type { WidgetState, WidgetAction } from '@/types'

export const widgetReducer = (
  state: WidgetState,
  action: WidgetAction
): WidgetState => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.payload
      }
    case 'TOGGLE_ACTIVE':
      return {
        ...state,
        active: !state.active
      }
    default:
      return state
  }
}
