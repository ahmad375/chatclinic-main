'use client'
import { useState, type FC } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  Text,
  FormLabel
} from '@chakra-ui/react'
import { Plan } from '@/enums'
import { useAPI, useBilling, useNotification } from '@/hooks'
import { UnexpectedErrorNotification, getPlanInfo } from '@/lib'
import { PrimaryButton, SecondaryButton } from '@/components/buttons'
import { CardInput, CustomSelect } from '@/components/common'
import { ModalCloseButton } from '../dashboard/modals/ModalCloseButton'
import { CustomInput } from '@/components/common'
import { User } from '@/types'
import { signIn } from 'next-auth/react'

export const PricingModal: FC<{
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  isLoggedInUser: boolean
}> = ({isOpen, setIsOpen, isLoggedInUser}) => {
  // For Stripe handling of payment method
  const [initialLoading, setInitialLoading] = useState(false)
  const { request } = useAPI()

  const stripe = useStripe()
  const elements = useElements()
  const { subscribe, subscribe_new_user, subscribeLoading } = useBilling()
  const { setNotification } = useNotification()
  const onClose = () =>
    setIsOpen(false)

  return (
    <Modal isOpen={isOpen} {...{ onClose }}>
      <ModalOverlay />
      <ModalContent
        as='form'
        onSubmit={async (e) => {
          try {
            e.preventDefault()
            setInitialLoading(true)

            const form = e.target as HTMLFormElement

            var paymentMethodId: string | undefined
            if (!stripe || !elements) throw new Error()

            const card = elements.getElement(CardElement)
            if (!card) throw new Error()

            const { error, paymentMethod } = await stripe.createPaymentMethod({
              type: 'card',
              card
            })

            if (error || !paymentMethod?.id) {
              return setNotification(
                error?.message
                  ? {
                      type: 'error',
                      title: error.message,
                      description: 'Please fix the error below'
                    }
                  : UnexpectedErrorNotification
              )
            }

            paymentMethodId = paymentMethod.id

            if(isLoggedInUser){
              let apiResponse = await subscribe(
                form.plan.value,
                paymentMethodId
              )
              console.log('==========apiResponse===========', apiResponse)
              if (apiResponse?.success) {
                onClose()
                window.location.href = '/dashboard'
              }
            }else {
              let apiResponse = await subscribe_new_user(
                form.__name.value,
                form.email.value.toLowerCase(),
                form.plan.value,
                paymentMethodId
              )
              if (apiResponse?.success) {
                onClose()
                // await request('/api/signup', {
                //   method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json'
                //   },
                //   body: JSON.stringify({
                //     name: form.__name.value,
                //     email: form.email.value.toLowerCase(),
                //     website: '',
                //     password: 'Hj8#2Xp9Qs7$Wt!',
                //     tos: Date.now(),
                //     tosUserAgent: window.navigator.userAgent,
                //     plan: form.plan.value,
                //     customerId: apiResponse?.customerId
                //   } as Partial<User>),
                //   // setIsLoading,
                //   async callback(apiResponse) {
                //     try {
                //       // skip callback if bad sign up response
                //       if (!apiResponse.success) return true
      
                //       const signInResponse = await signIn('credentials', {
                //         email: form.email.value.toLowerCase(),
                //         password: 'Hj8#2Xp9Qs7$Wt!',
                //         redirect: false
                //       })
      
                //       return signInResponse?.ok || false
                //     } catch {
                //       return false
                //     }
                //   }
                // })
                const signInResponse = await signIn('credentials', {
                  email: form.email.value.toLowerCase(),
                  password: apiResponse.password,
                  redirect: false
                })
                window.location.href = '/dashboard'
              }
            }
          } catch {
            setNotification(UnexpectedErrorNotification)
          } finally {
            setInitialLoading(false)
          }
        }}
        mx={6}
      >
        <ModalHeader>
          <Text size='lg' fontWeight={500} color='secondary.800'>
            Subscribe
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Plan</FormLabel>
            <CustomSelect name='plan'>
              <option value={Plan.Pro}>
                {Plan.Pro} (${getPlanInfo(Plan.Pro).amount}/mo)
              </option>
              <option value={Plan.Enterprise}>
                {Plan.Enterprise} (${getPlanInfo(Plan.Enterprise).amount}/mo)
              </option>
            </CustomSelect>
          </FormControl>
          {!isLoggedInUser &&
            <FormControl mt={3} isRequired>
              <FormLabel>Name</FormLabel>
              <CustomInput type='text' name='__name' placeholder='John Doe' />
            </FormControl>}
          {!isLoggedInUser &&
            <FormControl mt={3} isRequired>
              <FormLabel>Email</FormLabel>
              <CustomInput
                type='email'
                name='email'
                placeholder='you@example.com'
                autoComplete='off'
              />
            </FormControl>}
          <FormControl mt={3} isRequired>
            <FormLabel>Payment Method</FormLabel>
            <CardInput />
          </FormControl>
        </ModalBody>
        <ModalFooter pb={6}>
          <SecondaryButton rounded='lg' mr={2} onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            type='submit'
            isLoading={initialLoading || subscribeLoading}
            rounded='lg'
          >
            Subscribe
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
