'use client'
import type { FC, PropsWithChildren } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!)

export const ElementsProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        fonts: [
          {
            family: 'Inter',
            src: `/fonts/Inter-Regular.ttf`,
            // src: `url("https://www.chatclinicai.com/fonts/Inter-Regular.ttf")`,
            weight: '400'
          }
        ]
      }}
    >
      {children}
    </Elements>
  )
}
