import { Schema } from 'mongoose'
import { BaseModel } from './BaseModel'

export interface Video extends BaseModel {
  user: Schema.Types.ObjectId
  url: string
  title: string
  description?: string
  image?: string
}
