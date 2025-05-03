import type { Dispatch } from 'react'
import type { WidgetState, WidgetAction } from '..'

export interface WidgetContext {
  state: WidgetState
  dispatch: Dispatch<WidgetAction>
}
