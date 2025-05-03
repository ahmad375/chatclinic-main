import { BaseState } from '../state'

export type BaseAction =
  | { type: 'SET_ACTIVE'; payload: BaseState['active'] }
  | { type: 'TOGGLE_ACTIVE' }
