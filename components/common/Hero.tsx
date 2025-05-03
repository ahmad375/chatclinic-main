'use client'
import type { FC } from 'react'
import Link from 'next/link'
import { Box, Grid, GridItem, Heading, Icon, Text } from '@chakra-ui/react'
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight'
import { PrimaryButton } from '../buttons'
import { Container } from './Container'

export const Hero: FC = () => {
  return (
    <section>
      <Box minH='70vh' py={16} bgColor='customBlue.900'>
        <Container pos='relative'>
          <Grid
            autoFlow='row'
            rowGap={4}
            textAlign={{ base: 'left', md: 'center' }}
          >
            <GridItem>
              <Heading size='2xl' lineHeight='120%' color='white'>
                A.I. Powered Support For <br /> Your Website &amp; Business
              </Heading>
            </GridItem>
            <GridItem>
              <Text
                fontSize='xl'
                color='customGreen.200'
                maxW='md'
                mx={{ base: undefined, md: 'auto' }}
              >
                Get a support bot knowledgeable about your business. Our
                chatbots learn more about your business the longer you use them.
              </Text>
            </GridItem>
            <GridItem pt={4}>
              <Link href='/signup'>
                <PrimaryButton
                  size='lg'
                  rounded='xl'
                  rightIcon={<Icon as={FiArrowRight} />}
                >
                  Create a free account
                </PrimaryButton>
              </Link>
            </GridItem>
            <GridItem>
              <Text color='customGreen.200'>no credit card required</Text>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </section>
  )
}
