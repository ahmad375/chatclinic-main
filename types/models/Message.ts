import { Schema } from 'mongoose'
import { MessageRole } from '@/enums'
import type { BaseModel } from './BaseModel'
import { MessageAnnotations } from '..'

export interface Message extends BaseModel {
  user: Schema.Types.ObjectId
  thread: Schema.Types.ObjectId
  referenceId: string
  role: MessageRole
  content: string
  annotations: MessageAnnotations
}
