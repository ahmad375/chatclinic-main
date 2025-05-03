import { Plan } from '@/enums'
import type { WidgetTheme } from '..'
import type { BaseModel } from './BaseModel'
import { type ITimezone } from 'react-timezone-select'

export interface User extends BaseModel {
  name: string
  email: string
  website?: string | null
  password: string
  tos: number
  tosUserAgent: string
  authorizedDomains: string[]
  clientId: string

  /* Billing */
  plan: Plan
  messageUsage: number
  customerId: string
  subscriptionId: string | null

  widgetTheme: WidgetTheme
  widgetDefaultMessage: string
  widgetDetected: boolean

  recoverToken: string | null
  deviceToken: string | null
  isVerified: boolean

  workingHours?: {
    timeZone: ITimezone
    workingHours: {
      sunday: string
      monday: string
      tuesday: string
      wednesday: string
      thursday: string
      friday: string
      saturday: string
    }
  }
}
