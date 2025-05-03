import { model, models, Schema } from 'mongoose'
import { MessageRole } from '@/enums'
import type { Message } from '@/types'

export const MessageSchema = new Schema<Message>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: 'thread',
      required: true
    },
    role: {
      type: String,
      enum: Object.values(MessageRole),
      required: true
    },
    content: {
      type: String
    },
    annotations: {
      type: Schema.Types.Mixed,
      required: true,
      default: {}
    }
  },
  {
    timestamps: true
  }
)

export const Messages =
  models.message || model<Message>('message', MessageSchema)
