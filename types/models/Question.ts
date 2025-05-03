import { Schema } from 'mongoose'
import type { BaseModel } from './BaseModel'

export interface Question extends BaseModel {
  user: Schema.Types.ObjectId
  question: string
  answer: string
}
