import { Schema } from 'mongoose'
import type { BaseModel } from './BaseModel'

export interface Thread extends BaseModel {
  user: Schema.Types.ObjectId
  // generated on the client for reference
  uuid: string
  elevated: boolean
}
