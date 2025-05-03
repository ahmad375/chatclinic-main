import { model, models, Schema } from 'mongoose'
import type { LiveChat } from '@/types'

export const LiveChatSchema = new Schema<LiveChat>(
  {
    thread:{
      type: String,
      // ref: 'user',
      required: true,
    },
    clientId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      default: 'Unnamed Account'
    },
    email: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    },
    timeZone: {
      type: String,
      required: false
    },
    messages: [{
      content: {
        type: String,
        // required: true
      },
      file: {
        type: {
          fileName: String,
          fileType: String,
          fileSize: String,
          url: String
        },
        // required: true
      },
      role: {
        type: String,
        enum: ["support", "user"],
        // required: true
      },
      readFlag: {
        type: Number,
        enum: [0, 1],
        // required: true
      },
      created_at: {
        type: Date,
        default: Date.now  // Set the default value to the current timestamp
      }
    }],
    activeFlag: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

export const LiveChats = models.livechat || model<LiveChat>('livechat', LiveChatSchema)