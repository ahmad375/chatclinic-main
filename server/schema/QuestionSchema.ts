import { model, models, Schema } from 'mongoose'
import type { Question } from '@/types'

export const QuestionSchema = new Schema<Question>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Questions =
  models.question || model<Question>('question', QuestionSchema)
