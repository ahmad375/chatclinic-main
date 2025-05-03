'use client'
import type { FC } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon
} from '@chakra-ui/react'
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight'
import { PrimaryButton } from '../buttons'

export const CallToAction: FC = () => {
  return (
    <section>
      <Box
        bgGradient='linear(to-b, #ffffff 50%, var(--chakra-colors-customGreen-50) 50%)'
        py={12}
        color='white'
        textAlign='center'
      >
        <Container maxW='container.lg'>
          <Box
            className='pattern'
            px={6}
            py={16}
            rounded='2xl'
            textAlign='center'
          >
            <Grid autoFlow='row' rowGap={4}>
              <GridItem>
                <Heading size='lg'>Automate Your Customer Support</Heading>
              </GridItem>
              <GridItem>
                <Text fontSize='lg' color='customGreen.200' maxW='sm' mx='auto'>
                  Your A.I. customer support agent will be available 24/7.
                </Text>
              </GridItem>
              <GridItem pt={2}>
                <Link href='/signup'>
                  <PrimaryButton
                    rounded='lg'
                    rightIcon={<Icon as={FiArrowRight} />}
                  >
                    Get started
                  </PrimaryButton>
                </Link>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
    </section>
  )
}
