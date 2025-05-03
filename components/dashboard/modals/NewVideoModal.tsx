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
import { useDashboard, useVideos } from '@/hooks'
import { PrimaryButton, SecondaryButton } from '@/components/buttons'
import { CustomInput } from '@/components/common'
import { ModalCloseButton } from './ModalCloseButton'

export const NewVideoModal: FC = () => {
  const {
    state: { newVideoModal: isOpen },
    dispatch
  } = useDashboard()
  const { newVideo, newVideoLoading } = useVideos()
  const onClose = () =>
    dispatch({
      type: 'SET_NEW_VIDEO_MODAL',
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

          newVideo(form.url.value)
        }}
        mx={6}
      >
        <ModalHeader>
          <Text size='lg' fontWeight={500} color='secondary.800'>
            New Video
          </Text>
          <Text color='secondary.600' fontWeight={400} fontSize='md' mt={2}>
            Videos are YouTube video URLs that contain useful information for
            your A.I. support agent.
            <br />
            <br />
            <b>Example:</b> a valid YouTube URL such as
            https://www.youtube.com/watch?v=jNQXAC9IVRw
            <br />
            <b>Note:</b> if you receive an error, it may be because you have
            transcription disabled on your video
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>URL</FormLabel>
            <CustomInput
              type='url'
              name='url'
              placeholder='https://www.youtube.com/watch?v=jNQXAC9IVRw'
            />
          </FormControl>
        </ModalBody>
        <ModalFooter pb={6}>
          <SecondaryButton rounded='lg' mr={2} onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type='submit' isLoading={newVideoLoading} rounded='lg'>
            Add Video
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
