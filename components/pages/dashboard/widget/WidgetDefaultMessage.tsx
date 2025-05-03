'use client'
import { type FC } from 'react'
import { Grid, GridItem, Icon } from '@chakra-ui/react'
import { FiSave } from '@react-icons/all-files/fi/FiSave'
import { useCustomizeWidget, useDashboard } from '@/hooks'
import { DashboardSectionItem } from '@/components/dashboard'
import { CustomInput } from '@/components/common'
import { PrimaryButton } from '@/components/buttons'

export const WidgetDefaultMessage: FC = () => {
  const {
    state: { user }
  } = useDashboard()
  const { updateWidgetDefaultMessageLoading, updateWidgetDefaultMessage } =
    useCustomizeWidget()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        updateWidgetDefaultMessage(form.defaultMessage.value)
      }}
    >
      <DashboardSectionItem title='Default Message'>
        <Grid
          w='full'
          maxW='xl'
          templateColumns={{ base: '1fr', md: '1fr 0fr' }}
          alignItems='center'
          gap={3}
        >
          <GridItem>
            <CustomInput
              w='full'
              name='defaultMessage'
              defaultValue={user.widgetDefaultMessage}
              isRequired
            />
          </GridItem>
          <GridItem>
            <PrimaryButton
              type='submit'
              leftIcon={<Icon as={FiSave} />}
              isLoading={updateWidgetDefaultMessageLoading}
            >
              Save
            </PrimaryButton>
          </GridItem>
        </Grid>
      </DashboardSectionItem>
    </form>
  )
}
