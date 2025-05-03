'use client'
import type { FC } from 'react'
import Link from 'next/link'
import { Td, Tr, Text, Icon, Grid, GridItem } from '@chakra-ui/react'
import { HiPencil } from '@react-icons/all-files/hi/HiPencil'
import { HiTrash } from '@react-icons/all-files/hi/HiTrash'
import { useQuestions } from '@/hooks'
import { Tooltip } from '@/components/common'
import { DashboardTable, DashboardTableLoading } from '@/components/dashboard'
import { SecondaryIconButton } from '@/components/buttons'
import type { PaginateProps, Question } from '@/types'

export const QuestionsTable: FC<{
  questions: Question[] | undefined
  paginate: PaginateProps
}> = ({ questions, paginate }) => {
  const title = 'All Questions'
  const columns = ['Question', 'Answer', 'Created', 'Actions']
  const sharedProps = { title, columns }

  if (!questions) return <DashboardTableLoading {...sharedProps} />

  return (
    <DashboardTable {...{ paginate }} {...sharedProps}>
      {questions.map((question) => (
        <QuestionRow key={`tr-${question._id}`} {...{ question }} />
      ))}
    </DashboardTable>
  )
}

const QuestionRow: FC<{ question: Question }> = ({ question }) => {
  const { deleteQuestion, deleteQuestionLoading } = useQuestions()

  return (
    <Tr>
      <Td>
        <Text maxW='md'>{question.question}</Text>
      </Td>
      <Td>
        <Text maxW='md'>{question.answer}</Text>
      </Td>
      <Td>
        <Text>{new Date(question.createdAt).toLocaleDateString()}</Text>
      </Td>
      <Td minW={{ base: '0px', lg: '200px' }}>
        <Grid autoFlow='column' justifyContent='start' columnGap={2}>
          <GridItem>
            <Tooltip label='Delete Question'>
              <SecondaryIconButton
                size='sm'
                icon={<Icon as={HiTrash} />}
                aria-label='Delete Question'
                onClick={() => deleteQuestion(question._id)}
                isLoading={deleteQuestionLoading}
              />
            </Tooltip>
          </GridItem>
        </Grid>
      </Td>
    </Tr>
  )
}
