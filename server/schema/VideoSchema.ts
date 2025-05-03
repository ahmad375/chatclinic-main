import { model, models, Schema } from 'mongoose'
import type { Video } from '@/types'

export const VideoSchema = new Schema<Video>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

export const Videos = models.video || model<Video>('video', VideoSchema)
