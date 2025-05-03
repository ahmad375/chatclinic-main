'use client'
import type { FC, Dispatch, SetStateAction } from 'react'
import { FormControl, FormLabel, Grid, GridItem } from '@chakra-ui/react'
import { CustomInput, CustomTextArea } from '@/components/common'

export const QuestionPortal: FC<{
  question: string
  setQuestion: Dispatch<SetStateAction<string>>
  answer: string
  setAnswer: Dispatch<SetStateAction<string>>
}> = ({ question, setQuestion, answer, setAnswer }) => {
  return (
    <Grid autoFlow='row' rowGap={6} py={6}>
      <GridItem>
        <FormControl isRequired>
          <FormLabel pb={2}>Question</FormLabel>
          <CustomInput
            value={question}
            onInput={(e) => setQuestion((e.target as HTMLInputElement).value)}
            size='lg'
            rounded='xl'
            placeholder='What is your refund policy?'
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl isRequired>
          <FormLabel pb={2}>Answer</FormLabel>
          <CustomTextArea
            value={answer}
            onInput={(e) => setAnswer((e.target as HTMLInputElement).value)}
            size='lg'
            rounded='xl'
            minH={48}
            placeholder='Unfortunately, do to the nature of the product, we do not offer refunds.'
          />
        </FormControl>
      </GridItem>
    </Grid>
  )
}
