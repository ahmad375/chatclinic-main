'use client'
import { useState, useEffect, type FC } from 'react'
import { 
  Flex,
  Spinner,
  Grid,
  GridItem,
  Heading,
  Text,
  chakra,
  Box,
  Icon
} from '@chakra-ui/react'
import { useNotification, useAPI } from '@/hooks'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { MdVerified } from "react-icons/md";
import { UnexpectedErrorNotification } from '@/lib'

export const IsVerifiedPage: FC = () => {
  const { request } = useAPI()
  const { setNotification } = useNotification()
  const { get } = useSearchParams()
  const [isVerified, setIsVerified] = useState('checking')

  useEffect(() => {
    const email = get('email')
    const token = get('token')
    if(!email || !token){
      setIsVerified('no')
    }else{
      try {
        const doVerification = async () => {
          const verificationStatus = await request('/api/verify', {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              recoverToken:token,
            }),
          })
          if(verificationStatus.success)
            setIsVerified('yes')
          if(!verificationStatus.success){
            setIsVerified('no')
          }
        }
        doVerification();
      } catch {
        setNotification(UnexpectedErrorNotification)
        setIsVerified('no')
      }
    }
  }, [])

  return (
    <>
      {isVerified==='checking' &&
        <Flex
          w='35vw'
          h='25vh'
          maxH='fill-available'
          justifyContent='center'
          alignItems='center'
          bgColor='secondary.100'
          rounded='2xl'
        >
          <Spinner color='secondary.400' size='md' />
        </Flex>
      }
      {isVerified==='no' &&
        <Box w='full' maxW='lg' bgColor='white' rounded='2xl' px={6} py={10} alignItems={'center'}>
          <Grid autoFlow='row' rowGap={3} textAlign={'center'}>
            <GridItem mt={4}>
              <Heading fontSize='1.75em'>This link is not valid.</Heading>
            </GridItem>
            <GridItem>
              <Text fontSize='md' color='secondary.600'>
                Please use the link you received in your email.
              </Text>
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
      }
      {isVerified==='yes' &&
        <Box w='full' maxW='lg' bgColor='white' rounded='2xl' px={6} py={10} alignItems={'center'}>
          <Grid autoFlow='row' rowGap={3} textAlign={'center'}>
            <GridItem>
              <Icon as={MdVerified} fontSize='36px' color='#1ba11b' />
            </GridItem>
            <GridItem>
              <Heading fontSize='1.75em'>Email Verified</Heading>
            </GridItem>
            <GridItem>
              <Text fontSize='md' color='secondary.600'>
                Your email address was successfully verified.
              </Text>
            </GridItem>
            <GridItem mb={4}>
              <Text fontSize='md' color='secondary.600'>
                Go to{' '}
                <Link href='/dashboard'>
                  <chakra.span
                    color='primary.700'
                    textDecor='underline'
                    cursor='pointer'
                  >
                    Dashboard Page
                  </chakra.span>
                </Link>
              </Text>
            </GridItem>
          </Grid>
        </Box>
      }
    </>
  )
}
