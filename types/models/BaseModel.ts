import { Schema } from 'mongoose'

export interface BaseModel {
  _id: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
