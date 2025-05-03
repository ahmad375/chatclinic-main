import type { Dispatch } from 'react'
import { DashboardState, DashboardAction } from '..'

export interface DashboardContext {
  state: DashboardState
  dispatch: Dispatch<DashboardAction>
}
