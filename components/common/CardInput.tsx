'use client'
import { useState, type FC } from 'react'
import { Box } from '@chakra-ui/react'
import { CardElement } from '@stripe/react-stripe-js'

export const CardInput: FC = () => {
  const [focused, setFocused] = useState(false)

  return (
    <Box
      w='full'
      border='1px solid'
      borderColor={focused ? 'primary.700' : 'secondary.200'}
      bgColor='white'
      rounded='md'
      _hover={
        focused
          ? undefined
          : {
              borderColor: 'secondary.200'
            }
      }
      boxShadow={
        focused ? '0 0 0 1px var(--chakra-colors-primary-700)' : undefined
      }
      px={3}
      py={2.5}
    >
      <CardElement
        {...{
          options: {
            style: {
              base: {
                backgroundColor: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#000',
                '::placeholder': {
                  color: '#cbd5e1'
                }
              }
            }
          },
          onFocus() {
            setFocused(true)
          },
          onBlur() {
            setFocused(false)
          }
        }}
      />
    </Box>
  )
}
