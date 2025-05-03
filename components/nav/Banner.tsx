'use client'
import type { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Text, Icon } from '@chakra-ui/react'
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight'
import { Container } from '../common'

export const Banner: FC = () => {
  const { push } = useRouter()

  return (
    <Box
      color='customGreen.700'
      bgColor='customGreen.100'
      textAlign='center'
      py={4}
      cursor='pointer'
      onClick={() => push('/signup')}
    >
      <Container>
        <Text fontWeight={500}>
          Introducing <b>Tickets</b>! Our A.I. will now automatically submit
          support tickets{' '}
          <Icon display='inline' verticalAlign='-3px' as={FiArrowRight} />
        </Text>
      </Container>
    </Box>
  )
}
