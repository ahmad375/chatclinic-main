import { model, models, Schema } from 'mongoose'
import { DefaultDocumentTitle } from '@/lib'
import type { Document } from '@/types'

export const DocumentSchema = new Schema<Document>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    title: {
      type: String,
      required: false,
      default: DefaultDocumentTitle
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    content: {
      type: String,
      required: false,
      default: ''
    },
    plainContent: {
      type: String,
      required: false,
      default: ''
    },
    draft: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    timestamps: true
  }
)

export const Documents =
  models.document || model<Document>('document', DocumentSchema)
