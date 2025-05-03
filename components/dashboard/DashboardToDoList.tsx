'use client'
import { useState, type FC, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Icon,
  type ButtonProps
} from '@chakra-ui/react'
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight'
import { HiCheck } from '@react-icons/all-files/hi/HiCheck'
import { useDashboard } from '@/hooks'
import { SecondaryButton } from '../buttons'

export interface DashboardToDoListProps {
  hasADataSource: boolean
  hasAResolvedTicket: boolean
}

export const DashboardToDoList: FC<DashboardToDoListProps> = ({
  hasADataSource,
  hasAResolvedTicket
}) => {
  const { push } = useRouter()
  const {
    state: { user }
  } = useDashboard()
  const [activeStep, setActiveStep] = useState(
    user.widgetDetected ? (hasADataSource ? 3 : 2) : 1
  )

  const todos: ToDoStepProps[] = [
    {
      step: 1,
      title: 'Install the ChatClinic widget on your website',
      description:
        'Add the ChatClinic script to your website for the chat widget to appear. You can customize the theme color and default message for your widget.',
      action: {
        children: 'Install & Customize',
        onClick() {
          push('/dashboard/widget')
        }
      },
      active: activeStep === 1,
      onActive() {
        setActiveStep(1)
      },
      done: user.widgetDetected
    },
    {
      step: 2,
      title: 'Add your data sources',
      description:
        "Add data sources in order to inform your support agent's responses. Choose from publicly visible support documents, question/answers, web pages, or YouTube videos.",
      action: {
        children: 'Add data sources',
        onClick() {
          push('/dashboard/questions')
        }
      },
      active: activeStep === 2,
      onActive() {
        setActiveStep(2)
      },
      done: hasADataSource
    },
    {
      step: 3,
      title: 'Resolve customer support tickets',
      description:
        "When your support agent cannot answer a question, it will submit a support ticket to you on the user's behalf.",
      action: {
        children: 'View tickets',
        onClick() {
          push('/dashboard/tickets')
        }
      },
      active: activeStep === 3,
      onActive() {
        setActiveStep(3)
      },
      done: hasAResolvedTicket
    }
  ]

  return (
    <Box pt={6}>
      <Box py={2} rounded='xl' shadow='base' bgColor='white' overflow='hidden'>
        <Grid autoFlow='row' rowGap='1px' bgColor='secondary.100'>
          {todos.map((todo, i) => (
            <GridItem key={`dashboard-todo-${i}`}>
              <ToDoStep {...todo} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

interface ToDoStepProps {
  step: number
  title: ReactNode
  description: ReactNode
  active: boolean
  onActive: Function
  done?: boolean
  action: ButtonProps
}

const ToDoStep: FC<ToDoStepProps> = ({
  step,
  title,
  description,
  action,
  active,
  onActive,
  done
}) => {
  return (
    <Flex
      flexDir='row'
      justifyContent='space-between'
      alignItems='center'
      color='black'
      bgColor='white'
      cursor={active ? 'default' : 'pointer'}
      onClick={active ? undefined : () => onActive()}
      px={10}
    >
      <Grid autoFlow='row' alignItems='center' rowGap={2} py={8}>
        <GridItem>
          <Text
            fontSize='xl'
            fontWeight={500}
            color='secondary.900'
            opacity={done && !active ? 0.5 : 1}
          >
            Step #{step}: {title}
          </Text>
        </GridItem>
        {active && (
          <>
            <GridItem>
              <Text fontWeight={400} color='secondary.600' maxW='lg'>
                {description}
              </Text>
            </GridItem>
            <GridItem pt={2}>
              <SecondaryButton
                {...action}
                rightIcon={<FiArrowRight />}
                _hover={{ bgColor: 'primary.700', color: 'white' }}
              />
            </GridItem>
          </>
        )}
      </Grid>
      {done !== undefined && (
        <Flex
          flexShrink={0}
          justifyContent='center'
          alignItems='center'
          w={7}
          h={7}
          bgColor={done ? 'primary.700' : 'white'}
          border='2px solid'
          borderColor={done ? 'primary.700' : 'secondary.300'}
          rounded='full'
          color='white'
        >
          <Icon as={HiCheck} />
        </Flex>
      )}
    </Flex>
  )
}
