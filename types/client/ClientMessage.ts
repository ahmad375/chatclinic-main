import { ClientMessageSender } from '@/enums'

export type ClientMessage = {
  // To verify
  sender?: ClientMessageSender
  type: 'SET_ACTIVE'
  payload: boolean
}
