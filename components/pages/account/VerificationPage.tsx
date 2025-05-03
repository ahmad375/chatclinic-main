'use client'
import { useRef, useState, type FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Grid,
  GridItem,
  Heading,
  Text,
  chakra,
  Box
} from '@chakra-ui/react'
import { useAPI, useNotification } from '@/hooks'
import { PrimaryButton } from '@/components/buttons'

export const VerificationPage: FC<{email?:string}> = ({email}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const { request } = useAPI()
  const { setNotification } = useNotification()
  const router = useRouter()

  const resendHandler = async () => {
    if(!email){
      router.push('/login')
    }else {
      const apiResponse = await request('/api/verify/resend', {
        method: 'POST',
        body: JSON.stringify({
          email: email.toLowerCase(),
        }),
        setIsLoading
      })
      if(apiResponse.success)
        setIsDisabled(true)
    }
  }

  return (
    <Box w='full' maxW='lg' bgColor='white' rounded='2xl' px={8} py={10} alignItems={'center'}>
      <Grid autoFlow='row' rowGap={3} textAlign={'center'}>
        <GridItem mt={4}>
          <Heading fontSize='1.75em'>Please verify your email</Heading>
        </GridItem>
        <GridItem>
          <Text fontSize='md' color='secondary.600'>
            You are alomost there! We sent an email to{' '}
          </Text>
          <chakra.span
            color='secondary.600'
            fontWeight={600}
          >
            {email}
          </chakra.span>
        </GridItem>
        <GridItem>
          <Text fontSize='sm' color='secondary.600'>
            Just click on the link in that email to complete your signup.
          </Text>
          <Text fontSize='sm' color='secondary.600'>
            If you don't see it, you may need to{' '}
              <chakra.span
                // color='primary.700'
                // textDecor='underline'
                fontWeight={600}
                // cursor='pointer'
              >
                check your spam 
              </chakra.span>
            {' '}folder.
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize='sm' color='secondary.600'>
            Still can't find the email?
          </Text>
        </GridItem>
        <GridItem>
          <PrimaryButton
            // type='submit'
            w={'fit-content'}
            rounded='lg'
            {...{ isLoading, isDisabled }}
            onClick={resendHandler}
          >
            Resend Email
          </PrimaryButton>
        </GridItem>
        <GridItem>
          <Text fontSize='sm' color='secondary.600'>
            Need help?{' '}
              <chakra.span
                color='primary.700'
                textDecor='underline'
                cursor='pointer'
                onClick={() =>
                  window.open('mailto:hello@chatclinicai.com', '_blank')
                }
              >
                Contact Us
              </chakra.span>
          </Text>
        </GridItem>
      </Grid>
    </Box>
  )
}
