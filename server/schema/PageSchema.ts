import { model, models, Schema } from 'mongoose'
import type { Page } from '@/types'

export const PageSchema = new Schema<Page>(
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

export const Pages = models.page || model<Page>('page', PageSchema)
