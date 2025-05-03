import { Schema } from 'mongoose'
import { TicketStatus } from '@/enums'
import type { BaseModel } from './BaseModel'

export interface Ticket extends BaseModel {
  user: Schema.Types.ObjectId
  name: string
  email: string
  details: string
  status: TicketStatus
  referenceId: string
}
