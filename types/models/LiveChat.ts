import { Schema } from 'mongoose'
import type { BaseModel } from './BaseModel'

export interface LiveChat extends BaseModel {
  thread: string
  clientId: string
  name: string
  email: string
  phone_number?: string | null
  location?: string
  timeZone?: string
  messages: Partial<{
    content: string,
    file?: {
      fileName?: string,
      fileType?: string,
      fileSize?: string,
      url?: string
    } | null,
    role: string,
    readFlag: number,
    created_at: Date
  }>[]
  activeFlag: number
}