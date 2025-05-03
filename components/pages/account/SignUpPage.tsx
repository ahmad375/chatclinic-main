'use client'
import { useState, type FC } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import {
  Checkbox,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Text,
  chakra,
  Divider,
  Box,
  AbsoluteCenter,
  Icon
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useAPI, useNotification } from '@/hooks'
import { MinPasswordLength, UnexpectedErrorNotification } from '@/lib'
import { User } from '@/types'
import { Form, AccountFormLabel } from '../../account'
import { CustomInput } from '../../common'
import { PrimaryButton, SocialIconButton } from '../../buttons'
import { Plan } from '@/enums'
import { FcGoogle } from "react-icons/fc";
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";

export const SignUpPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading_Google, setIsLoading_Google] = useState<boolean>(false)
  const [isLoading_Outlook, setIsLoading_Outlook] = useState<boolean>(false)
  const { setNotification } = useNotification()
  const { request } = useAPI()
  const router = useRouter()

  const signInwithGoogle = async() => {
    try {
      setIsLoading_Google(true)
      const googleSignInResult = await signIn('google')
      console.log('=======googleSignInResult=========', googleSignInResult)
    } catch {
      setNotification(UnexpectedErrorNotification)
    } finally {
      setIsLoading_Google(false)
    }
  }

  const signInwithOutlook = async() => {
    try {
      setIsLoading_Outlook(true)
      await signIn('azure-ad')
    } catch {
      setNotification(UnexpectedErrorNotification)
    } finally {
      setIsLoading_Outlook(false)
    }
  }
  
  return (
    <Form
      onSubmit={async (e) => {
        try {
          e.preventDefault()

          const form = e.target as HTMLFormElement

          if (!form.tos.value)
            throw new Error('Did not agree to Terms of Service')

          const password = form.password.value

          if (password.length < MinPasswordLength)
            return setNotification({
              type: 'error',
              title: 'Password Too Short',
              description: 'Please choose a longer password'
            })

            await request('/api/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: form.__name.value,
                email: form.email.value.toLowerCase(),
                website: form.website.value,
                password,
                tos: Date.now(),
                tosUserAgent: window.navigator.userAgent,
                plan: Plan.Free
              } as Partial<User>),
              setIsLoading,
              async callback(apiResponse) {
                try {
                  // skip callback if bad sign up response
                  if (!apiResponse.success) return true
  
                  const signInResponse = await signIn('credentials', {
                    email: form.email.value.toLowerCase(),
                    password: form.password.value,
                    redirect: false
                  })
  
                  return signInResponse?.ok || false
                } catch {
                  return false
                }
              }
            })
        } catch (e) {
          setNotification(UnexpectedErrorNotification)
        } finally {
          setIsLoading(false)
        }
      }}
    >
      <Grid autoFlow='row' rowGap={3}>
        <GridItem>
          <Heading fontSize='1.75em'>Sign Up &mdash; it&apos;s free!</Heading>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <AccountFormLabel>Name</AccountFormLabel>
            <CustomInput type='text' name='__name' placeholder='John Doe' />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <AccountFormLabel>Email</AccountFormLabel>
            <CustomInput
              type='email'
              name='email'
              placeholder='you@example.com'
              autoComplete='off'
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <AccountFormLabel>Website</AccountFormLabel>
            <CustomInput
              type='url'
              name='website'
              placeholder='https://example.com'
              autoComplete='new-password'
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
        <GridItem pt={1}>
          <Checkbox colorScheme='primaryDark' name='tos' required>
            I agree to the{' '}
            <Link href='/legal/terms'>
              <chakra.span color='primary.700' textDecor='underline'>
                Terms of Service
              </chakra.span>
            </Link>
            .
          </Checkbox>
        </GridItem>
        <GridItem pt={2}>
          <PrimaryButton type='submit' w='full' rounded='lg' {...{ isLoading }}>
            Sign Up
          </PrimaryButton>
        </GridItem>
        <Box position='relative' paddingTop='5' paddingBottom='3'>
          <Divider />
          <AbsoluteCenter bg='white' px='4'>
            or
          </AbsoluteCenter>
        </Box>
        <Grid autoFlow='column'columnGap={20} justifyContent={'center'} marginBottom={0}>
          <SocialIconButton
            icon={<Icon size={20} as={FcGoogle} />}
            aria-label='Google'
            isLoading={isLoading_Google}
            onClick={signInwithGoogle}
          />
          <SocialIconButton
            icon={<Icon size={20} as={PiMicrosoftOutlookLogoBold} />}
            aria-label='Outlook'
            isLoading={isLoading_Outlook}
            onClick={signInwithOutlook}
          />
        </Grid>
        <GridItem textAlign={'center'}>
          <Text fontSize='sm' color='secondary.600'>
            Already have an account?{' '}
            <Link href='/login'>
              <chakra.span
                color='primary.700'
                textDecor='underline'
                cursor='pointer'
              >
                Sign In
              </chakra.span>
            </Link>{' '}
            instead.
          </Text>
        </GridItem>
      </Grid>
    </Form>
  )
}
