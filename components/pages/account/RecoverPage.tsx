'use client'
import { useRef, useState, type FC } from 'react'
import Link from 'next/link'
import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  Text,
  chakra
} from '@chakra-ui/react'
import { useAPI, useNotification } from '@/hooks'
import { UnexpectedErrorNotification } from '@/lib'
import { PrimaryButton } from '@/components/buttons'
import { Form, AccountFormLabel } from '../../account'
import { CustomInput } from '../../common'

export const RecoverPage: FC = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const { request } = useAPI()
  const { setNotification } = useNotification()

  return (
    <Form
      onSubmit={async (e) => {
        try {
          e.preventDefault()
          setIsLoading(true)

          const form = e.target as HTMLFormElement

          const apiResponse = await request('/api/recover', {
            method: 'POST',
            body: JSON.stringify({
              email: form.email.value.toLowerCase()
            }),
            setIsLoading
          })

          if (apiResponse.success && ref.current) {
            setIsDisabled(true)
            ref.current.value = ''
          }
        } catch {
          setNotification(UnexpectedErrorNotification)
        } finally {
          setIsLoading(false)
        }
      }}
    >
      <Grid autoFlow='row' rowGap={3}>
        <GridItem>
          <Heading fontSize='1.75em'>Recover Account</Heading>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <AccountFormLabel>Email</AccountFormLabel>
            <CustomInput
              {...{ ref }}
              type='email'
              name='email'
              placeholder='you@example.com'
              {...{ isDisabled }}
            />
          </FormControl>
        </GridItem>
        <GridItem pt={2}>
          <PrimaryButton
            type='submit'
            w='full'
            rounded='lg'
            {...{ isLoading, isDisabled }}
          >
            Send Recovery Email
          </PrimaryButton>
        </GridItem>
        <GridItem>
          <Text fontSize='sm' color='secondary.600'>
            Remember your password?{' '}
            <Link href='/login'>
              <chakra.span
                color='primary.700'
                textDecor='underline'
                cursor='pointer'
              >
                Log in
              </chakra.span>
            </Link>{' '}
            instead.
          </Text>
        </GridItem>
      </Grid>
    </Form>
  )
}
