'use client'
import type { FC } from 'react'
import { Grid, GridItem, Heading, Flex, Spinner, Icon } from '@chakra-ui/react'
import { HiCheck } from '@react-icons/all-files/hi/HiCheck'
import { useCustomizeWidget, useDashboard } from '@/hooks'
import { WidgetThemes } from '@/lib'
import { DashboardSectionItem } from '@/components/dashboard'
import { Tooltip } from '@/components/common'
import type { WidgetTheme as IWidgetTheme } from '@/types'

export const WidgetTheme: FC = () => {
  const {
    state: { user }
  } = useDashboard()

  return (
    <DashboardSectionItem title='Widget Theme'>
      <Grid autoFlow='row' rowGap={4}>
        <GridItem>
          <Heading fontSize='1.5em' color='secondary.900'>
            Current Theme: {user.widgetTheme.name}
          </Heading>
        </GridItem>
        <GridItem>
          <Flex flexDir='row' flexWrap='wrap' gap={2}>
            {WidgetThemes.map((theme) => (
              <ThemeItem {...{ theme }} />
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </DashboardSectionItem>
  )
}

const ThemeItem: FC<{ theme: IWidgetTheme }> = ({ theme }) => {
  const {
    state: { user }
  } = useDashboard()
  const { updateWidgetTheme, updateWidgetThemeLoading } = useCustomizeWidget()
  const selected = user.widgetTheme.id === theme.id

  return (
    <Tooltip label={theme.name}>
      <Flex
        justifyContent='center'
        alignItems='center'
        w={10}
        h={10}
        bgColor={theme.primaryColor}
        rounded='full'
        cursor='pointer'
        color='white'
        pointerEvents={selected ? 'none' : 'all'}
        onClick={() => updateWidgetTheme(theme)}
      >
        {selected && <Icon as={HiCheck} fontSize='xl' />}
        {updateWidgetThemeLoading && <Spinner size='sm' />}
      </Flex>
    </Tooltip>
  )
}
