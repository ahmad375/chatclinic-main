import { Schema } from 'mongoose'
import type { BaseModel } from './BaseModel'

export interface Document extends BaseModel {
  user: Schema.Types.ObjectId
  title: string
  subtitle: string
  content: string
  // needed for vectors
  plainContent: string
  draft: boolean
}
