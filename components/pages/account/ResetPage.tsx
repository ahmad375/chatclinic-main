'use client'
import { useRef, useState, type FC } from 'react'
import { useSearchParams } from 'next/navigation'
import { Grid, GridItem, Heading, FormControl } from '@chakra-ui/react'
import { useAPI, useNotification } from '@/hooks'
import { MinPasswordLength, UnexpectedErrorNotification } from '@/lib'
import { PrimaryButton } from '@/components/buttons'
import { Form, AccountFormLabel } from '../../account'
import { CustomInput } from '../../common'

export const ResetPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { get } = useSearchParams()
  const { request } = useAPI()
  const { setNotification } = useNotification()
  const email = get('email')
  const token = get('token')

  return (
    <Form
      onSubmit={async (e) => {
        try {
          e.preventDefault()
          setIsLoading(true)

          const form = e.target as HTMLFormElement
          const password = form.password.value

          if (password.length < MinPasswordLength)
            return setNotification({
              type: 'error',
              title: 'Password Too Short',
              description: 'Please choose a longer password'
            })

          await request('/api/reset', {
            method: 'POST',
            body: JSON.stringify({
              email: form.email.value.toLowerCase(),
              token,
              password
            }),
            setIsLoading
          })
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
              type='email'
              name='email'
              placeholder='you@example.com'
              value={email || ''}
              isDisabled={!!email}
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <AccountFormLabel>Password</AccountFormLabel>
            <CustomInput
              type='password'
              name='password'
              placeholder='••••••••'
              autoComplete='new-password'
            />
          </FormControl>
        </GridItem>
        <GridItem pt={2}>
          <PrimaryButton type='submit' w='full' rounded='lg' {...{ isLoading }}>
            Reset Password
          </PrimaryButton>
        </GridItem>
      </Grid>
    </Form>
  )
}
