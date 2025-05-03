import { model, models, Schema } from 'mongoose'
import type { Thread } from '@/types'

export const ThreadSchema = new Schema<Thread>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    uuid: {
      type: String,
      required: true
    },
    elevated: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: true
  }
)

export const Threads = models.thread || model<Thread>('thread', ThreadSchema)
