import { model, models, Schema } from 'mongoose'
import { nanoid } from 'nanoid'
import type { Ticket } from '@/types'
import { TicketStatus } from '@/enums'

export const TicketSchema = new Schema<Ticket>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    name: {
      type: String,
      required: false,
      default: 'Unnamed User'
    },
    email: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(TicketStatus),
      required: false,
      default: TicketStatus.Open
    },
    referenceId: {
      type: String,
      required: true,
      default() {
        return nanoid()
      }
    }
  },
  {
    timestamps: true
  }
)

export const Tickets = models.ticket || model<Ticket>('ticket', TicketSchema)
