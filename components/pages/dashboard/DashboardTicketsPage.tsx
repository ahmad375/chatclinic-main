'use client'
import { useEffect, type FC } from 'react'
import { useDashboard, usePaginate, useTickets } from '@/hooks'
import { DashboardSectionTitle } from '@/components/dashboard'
import { EmptyTickets, TicketsTable } from './tickets'

export const DashboardTicketsPage: FC = () => {
  const {
    dispatch,
    state: { tickets, totalTickets }
  } = useDashboard()
  const { fetchTickets } = useTickets()
  const { page } = usePaginate()

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Tickets'}
    })
  },[])

  useEffect(() => {
    fetchTickets(page)
  }, [page])

  useEffect(() => {
    dispatch({
      type: 'SET_TICKETS',
      payload: {
        tickets: undefined,
        totalTickets: 0
      }
    })
  }, [page])

  return (
    <>
      {/* <DashboardSectionTitle>Tickets</DashboardSectionTitle> */}
      {tickets && tickets.length === 0 && <EmptyTickets />}
      {(!tickets || tickets.length > 0) && (
        <TicketsTable
          {...{
            tickets,
            paginate: {
              total: totalTickets,
              current: tickets ? tickets.length : 0,
              page
            }
          }}
        />
      )}
    </>
  )
}
