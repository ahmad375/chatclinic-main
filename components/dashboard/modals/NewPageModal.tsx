'use client'
import type { FC } from 'react'
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
import { useDashboard, usePages } from '@/hooks'
import { PrimaryButton, SecondaryButton } from '@/components/buttons'
import { CustomInput } from '@/components/common'
import { ModalCloseButton } from './ModalCloseButton'

export const NewPageModal: FC = () => {
  const {
    state: { newPageModal: isOpen },
    dispatch
  } = useDashboard()
  const { newPage, newPageLoading } = usePages()
  const onClose = () =>
    dispatch({
      type: 'SET_NEW_PAGE_MODAL',
      payload: false
    })

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay />
      <ModalContent
        as='form'
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.target as HTMLFormElement
          newPage(form.url.value)
        }}
        mx={6}
      >
        <ModalHeader>
          <Text size='lg' fontWeight={500} color='secondary.800'>
            New Page
          </Text>
          <Text color='secondary.600' fontWeight={400} fontSize='md' mt={2}>
            Pages are URLs from your website that contain useful information for
            your A.I. support agent.
            <br />
            <br />
            <b>Example:</b> to include your pricing page, add
            https://yourdomain.com/pricing
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>URL</FormLabel>
            <CustomInput
              type='url'
              name='url'
              placeholder='https://example.com/pricing'
            />
          </FormControl>
        </ModalBody>
        <ModalFooter pb={6}>
          <SecondaryButton rounded='lg' mr={2} onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type='submit' isLoading={newPageLoading} rounded='lg'>
            Add Page
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
