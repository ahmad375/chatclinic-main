import { Schema } from 'mongoose'

export interface Message {
  content: string
  file?: {
    fileName?: string,
    fileType?: string,
    url?: string
  } | null
  role: Schema.Types.ObjectId | string
  readFlag: number
  created_at: Date
}