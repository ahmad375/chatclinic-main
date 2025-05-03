'use client'
import type { FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text
} from '@chakra-ui/react'
import { useBilling, useDashboard } from '@/hooks'
import { PrimaryButton, SecondaryButton } from '@/components/buttons'
import { ModalCloseButton } from './ModalCloseButton'

export const CancelModal: FC = () => {
  const {
    state: { cancelModal: isOpen, user },
    dispatch
  } = useDashboard()
  const { cancel, cancelLoading } = useBilling()
  const onClose = () =>
    dispatch({
      type: 'SET_CANCEL_MODAL',
      payload: false
    })

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent
        as='form'
        onSubmit={async (e) => {
          e.preventDefault()
          const apiResponse = await cancel()
          if (apiResponse) {
            onClose()
            window.location.href = '/dashboard/billing'
          }
        }}
        mx={6}
      >
        <ModalHeader>
          <Text size='lg' fontWeight={500} color='secondary.800'>
            Cancel
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you wish to continue? You will immediately lose access
            to all of your <b>{user.plan}</b> features.
          </Text>
        </ModalBody>
        <ModalFooter pb={6}>
          <SecondaryButton rounded='lg' mr={2} onClick={onClose}>
            Nevermind
          </SecondaryButton>
          <PrimaryButton type='submit' isLoading={cancelLoading} rounded='lg'>
            Cancel
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
