'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UnexpectedErrorNotification } from '@/lib'
import type { Ticket } from '@/types'
import { useDashboard, useAPI, useNotification } from '.'

export const useTickets = (): {
  resolveTicketLoading: boolean

  fetchTickets: (page: number) => Promise<void>
  fetchTicket: (ticketId: string) => Promise<void>
  resolveTicket: (ticketId: Ticket['_id']) => Promise<void>
} => {
  const [resolveTicketLoading, setResolveTicketLoading] = useState(false)
  const { push } = useRouter()
  const { dispatch } = useDashboard()
  const { request } = useAPI()
  const { setNotification } = useNotification()

  const fetchTickets = async (page: number) => {
    request<{ tickets: Ticket[]; totalTickets: number }>(
      `/api/tickets?page=${encodeURIComponent(page)}`,
      {
        withMinimumDelay: true,
        async callback(apiResponse) {
          if (apiResponse.success)
            dispatch({
              type: 'SET_TICKETS',
              payload: {
                tickets: apiResponse.tickets,
                totalTickets: apiResponse.totalTickets
              }
            })
          return true
        }
      }
    )
  }

  return {
    resolveTicketLoading,
    fetchTickets,
    async fetchTicket(ticketId) {
      const apiResponse = await request<{ ticket?: Ticket | null }>(
        `/api/tickets/${ticketId}`,
        {
          withMinimumDelay: true
        }
      )
      if (apiResponse.ticket)
        dispatch({
          type: 'SET_TICKET',
          payload: apiResponse.ticket
        })
    },
    async resolveTicket(ticketId) {
      try {
        if (resolveTicketLoading) return

        setResolveTicketLoading(true)

        const apiResponse = await request<{ ticket?: Ticket }>(
          `/api/tickets/${ticketId}/resolve`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ticketId
            }),
            setIsLoading: setResolveTicketLoading
          }
        )

        if (apiResponse.ticket) {
          push('/dashboard/tickets')
          dispatch({
            type: 'SET_TICKETS',
            payload: {
              tickets: undefined,
              totalTickets: 0
            }
          })
          await fetchTickets(1)
        }
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setResolveTicketLoading(false)
      }
    }
  }
}
