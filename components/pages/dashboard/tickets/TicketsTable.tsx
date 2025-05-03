'use client'
import { type FC, useState } from 'react'
import Link from 'next/link'
import { Td, Tr, Text, Icon, Badge, Grid, GridItem } from '@chakra-ui/react'
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight'
import { DashboardTable, DashboardTableLoading } from '@/components/dashboard'
import type { PaginateProps, Ticket } from '@/types'
import { SecondaryButton, SecondaryIconButton } from '@/components/buttons'
import { TicketStatus } from '@/enums'
import { Tooltip } from '@/components/common'
import { useAPI, useNotification, useDashboard } from '@/hooks'
import { UnexpectedErrorNotification } from '@/lib'
import { HiTrash } from '@react-icons/all-files/hi/HiTrash'

export const TicketsTable: FC<{
  tickets: Ticket[] | undefined
  paginate: PaginateProps
}> = ({ tickets, paginate }) => {
  const title = 'All Tickets'
  const columns = ['Email', 'Details', 'Status', 'Created', 'Actions']
  const sharedProps = { title, columns }

  if (!tickets) return <DashboardTableLoading {...sharedProps} />

  return (
    <DashboardTable {...{ paginate }} {...sharedProps}>
      {tickets.map((ticket) => (
        <TicketRow key={`tr-${ticket._id}`} {...{ ticket }} />
      ))}
    </DashboardTable>
  )
}

const TicketRow: FC<{ ticket: Ticket }> = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { request } =useAPI()
  const { setNotification } = useNotification()
  const {
    dispatch,
    state: { tickets, totalTickets }
  } = useDashboard()
  const deleteHandler = async() => {
    try{
      setIsLoading(true)
      const apiResponse = await request(
        `/api/tickets/${ticket._id}/delete`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          setIsLoading
        }
      )
      if(apiResponse.success){
        const updatedTickets = tickets?.filter((item)=>item._id !== ticket._id)
        dispatch({
          type: 'SET_TICKETS',
          payload: {
            tickets: updatedTickets,
            totalTickets: totalTickets-1
          }
        })
      }
    }catch{
      setNotification(UnexpectedErrorNotification);
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <Tr>
      <Td>
        <Text>{ticket.email}</Text>
      </Td>
      <Td>
        <Text maxW='md'>{ticket.details}</Text>
      </Td>
      <Td>
        <Badge
          variant='subtle'
          colorScheme={
            ticket.status === TicketStatus.Resolved ? 'purple' : 'green'
          }
          rounded='full'
          textTransform='uppercase'
          fontSize='xs'
          fontWeight={500}
          px={3}
          py={1}
        >
          {ticket.status}
        </Badge>
      </Td>
      <Td>
        <Text>{new Date(ticket.createdAt).toLocaleDateString()}</Text>
      </Td>
      <Td minW={{ base: '0px', lg: '200px' }}>
        <Grid autoFlow='column' justifyContent='start' columnGap={2}>
          <GridItem>
            <Tooltip label='Manage Ticket'>
              <Link href={`/dashboard/tickets/${ticket._id}`}>
                <SecondaryButton
                  size='sm'
                  rounded='md'
                  rightIcon={<Icon as={FiArrowRight} />}
                >
                  Manage
                </SecondaryButton>
              </Link>
            </Tooltip>
          </GridItem>
          <GridItem>
            <Tooltip label='Delete Ticket'>
              <SecondaryIconButton
                size='sm'
                icon={<Icon as={HiTrash} />}
                isLoading={isLoading}
                onClick={deleteHandler}
                // isLoading={deleteDocumentLoading}
                aria-label='Delete Ticket'
              />
            </Tooltip>
          </GridItem>
        </Grid>
        {/* <Link href={`/dashboard/tickets/${ticket._id}`}>
          <SecondaryButton
            size='sm'
            rounded='md'
            rightIcon={<Icon as={FiArrowRight} />}
          >
            Manage
          </SecondaryButton>
        </Link> */}
      </Td>
    </Tr>
  )
}
