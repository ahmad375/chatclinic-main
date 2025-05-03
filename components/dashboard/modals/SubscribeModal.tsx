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
import { useBilling, useDashboard, useNotification } from '@/hooks'
import { UnexpectedErrorNotification, getPlanInfo } from '@/lib'
import { PrimaryButton, SecondaryButton } from '@/components/buttons'
import { CardInput, CustomSelect } from '@/components/common'
import { ModalCloseButton } from './ModalCloseButton'

export const SubscribeModal: FC = () => {
  // For Stripe handling of payment method
  const [initialLoading, setInitialLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const {
    state: { subscribeModal: isOpen },
    dispatch
  } = useDashboard()
  const { subscribe, subscribeLoading } = useBilling()
  const { setNotification } = useNotification()
  const onClose = () =>
    dispatch({
      type: 'SET_SUBSCRIBE_MODAL',
      payload: false
    })

  return (
    <Modal {...{ isOpen, onClose }}>
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

            const apiResponse = await subscribe(
              form.plan.value,
              paymentMethodId
            )
            console.log('==========apiResponse===========', apiResponse)
            if (apiResponse?.success) {
              onClose()
              window.location.href = '/dashboard/billing'
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
