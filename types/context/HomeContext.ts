import type { Dispatch } from 'react'
import { DashboardAction, HomeState } from '..'

export interface HomeContext {
  state: HomeState
  dispatch: Dispatch<DashboardAction>
}
