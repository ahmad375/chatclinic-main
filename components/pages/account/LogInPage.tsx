'use client'
import { useState, type FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormHelperText,
  chakra,
  Text,
  Divider,
  AbsoluteCenter,
  Box,
  Icon
} from '@chakra-ui/react'
import { useAPI, useNotification, useSignInResponseHandler } from '@/hooks'
import { UnexpectedErrorNotification } from '@/lib'
import { PrimaryButton, SocialButton } from '@/components/buttons'
import { Form, AccountFormLabel } from '../../account'
import { CustomInput } from '../../common'
import { FcGoogle } from "react-icons/fc";
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";

export const LogInPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoading_Google, setIsLoading_Google] = useState<boolean>(false)
  const [isLoading_Outlook, setIsLoading_Outlook] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const { request } = useAPI()
  const router = useRouter()
  const { setNotification } = useNotification()
  const { signInResponseHandler } = useSignInResponseHandler()

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
          setIsLoading(true)

          const form = e.target as HTMLFormElement

          const signInResult = await signIn('credentials', {
            email: form.email.value.toLowerCase(),
            password: form.password.value,
            redirect: false
          })

          console.log('======signInResult======', signInResult)

          signInResponseHandler(signInResult, {
            type: 'success',
            title: 'Logged In',
            description: 'You have successfully logged in'
          })

          if (signInResult?.ok) {
            router.push(searchParams.get('next') || '/dashboard')
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
          <Heading fontSize='1.75em'>Sign In</Heading>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <AccountFormLabel>Email</AccountFormLabel>
            <CustomInput
              type='email'
              name='email'
              placeholder='you@example.com'
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
            />
            <FormHelperText color='secondary.600'>
              Forgot your password?{' '}
              <Link href='/recover'>
                <chakra.span
                  color='primary.700'
                  textDecor='underline'
                  cursor='pointer'
                >
                  Reset it
                </chakra.span>
              </Link>{' '}
              here.
            </FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem pt={2}>
          <PrimaryButton type='submit' w='full' rounded='lg' {...{ isLoading }}>
            Sign In
          </PrimaryButton>
        </GridItem>
        <Box position='relative' paddingTop='5' paddingBottom='5'>
          <Divider />
          <AbsoluteCenter bg='white' px='4'>
            or
          </AbsoluteCenter>
        </Box>
        <GridItem>
          <SocialButton 
            // type='submit'
            w='full'
            rounded='lg'
            isLoading={isLoading_Google}
            leftIcon={<Icon as={FcGoogle} />}
            onClick={signInwithGoogle}
          >
            Sign In with Google
          </SocialButton>
        </GridItem>
        <GridItem py={1}>
          <SocialButton 
            // type='submit'
            w='full'
            rounded='lg'
            isLoading={isLoading_Outlook}
            leftIcon={<Icon as={PiMicrosoftOutlookLogoBold} />}
            onClick={signInwithOutlook}
          >
            Sign In with Outlook
          </SocialButton>
        </GridItem>
        <GridItem>
          <Text fontSize='sm' color='secondary.600'>
            Don&apos;t have an account?{' '}
            <Link href='/signup'>
              <chakra.span
                color='primary.700'
                textDecor='underline'
                cursor='pointer'
              >
                Create an account
              </chakra.span>
            </Link>{' '}
            instead.
          </Text>
        </GridItem>
      </Grid>
    </Form>
  )
}
