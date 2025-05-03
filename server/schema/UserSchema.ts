import { model, models, Schema } from 'mongoose'
import { Plan } from '@/enums'
import { WidgetThemes } from '@/lib'
import type { User } from '@/types'
import {ITimezone} from 'react-timezone-select'

export const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      default: 'Unnamed Account'
    },
    email: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: false,
      default: null
    },
    password: {
      type: String,
      required: true
    },
    tos: {
      type: Number,
      required: true,
      default: Date.now
    },
    tosUserAgent: {
      type: String,
      required: true,
      default: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    authorizedDomains: {
      type: [String],
      required: true,
      default: []
    },
    clientId: {
      type: String,
      required: true
    },
    plan: {
      type: String,
      enum: Object.values(Plan),
      required: false,
      default: Plan.Free
    },
    messageUsage: {
      type: Number,
      required: false,
      default: 0
    },
    customerId: {
      type: String,
      required: false
    },
    subscriptionId: {
      type: String,
      required: false,
      // Even though we will set it
      default: null
    },
    widgetTheme: {
      type: Object,
      required: false,
      default: WidgetThemes[0]
    },
    widgetDefaultMessage: {
      type: String,
      required: false,
      default: 'Hello! How can I help you today?'
    },
    widgetDetected: {
      type: Boolean,
      required: false,
      default: false
    },
    recoverToken: {
      type: String,
      required: false,
      default: null
    },
    deviceToken: {
      type: String,
      required: false,
      default: null
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false
    },
    workingHours: {
      type: {
        timeZone: {
          value: String,
          label: String,
          abbrev: String,
          altName: String,
          offset: Number, 
        },
        workingHours: {
          sunday: String, 
          monday: String,
          tuesday: String,
          wednesday: String,
          thursday: String,
          friday: String,
          saturday: String,
        }
      },
      required: false,
      default:{
        timeZone: {
          value: 'America/Chicago',
          label: '(GMT-5:00) Central Time',
          abbrev: 'CDT',
          altName: 'Central Daylight Time',
          offset: -5
        },
        workingHours: {
          sunday: 'No working',
          monday: '09:00-17:00',
          tuesday: '09:00-17:00',
          wednesday: '09:00-17:00',
          thursday: '09:00-17:00',
          friday: '09:00-17:00',
          saturday: '09:00-13:00'
        }
      }
    }
  },
  {
    timestamps: true
  }
)

export const Users = models.user || model<User>('user', UserSchema)
