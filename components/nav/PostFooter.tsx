'use client'
import type { FC } from 'react'
import { Box, Text, chakra } from '@chakra-ui/react'
import { Container } from '../common'

export const PostFooter: FC = () => {
  return (
    <section>
      <Box bgColor='customGreen.50' pb={10}>
        <Container maxW='container.lg'>
          <Text color='customGreen.800' fontSize='sm'>
            Reach us at{' '}
            <chakra.span
              cursor='pointer'
              textDecor='underline'
              onClick={() =>
                window.open('mailto:hello@chatclinicai.com', '_blank')
              }
            >
              hello@chatclinicai.com
            </chakra.span>
          </Text>
        </Container>
      </Box>
    </section>
  )
}
