import type { Dispatch } from 'react'
import { FrameState, FrameAction } from '..'

export interface FrameContext {
  state: FrameState
  dispatch: Dispatch<FrameAction>
}
