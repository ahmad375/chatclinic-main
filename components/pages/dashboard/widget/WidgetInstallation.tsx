'use client'
import type { FC } from 'react'
import { Grid, GridItem, Icon, useClipboard } from '@chakra-ui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { HiClipboardCopy } from '@react-icons/all-files/hi/HiClipboardCopy'
import { HiCheck } from '@react-icons/all-files/hi/HiCheck'
import { useDashboard, useNotification } from '@/hooks'
import { DashboardSectionItem } from '@/components/dashboard'
import { PrimaryButton } from '@/components/buttons'

export const WidgetInstallation: FC = () => {
  const {
    state: { user }
  } = useDashboard()
  const codeString = `<script defer src='${process.env.NEXT_PUBLIC_APP_URI}/api/js/v1/${user.clientId}'></script>`
  const { hasCopied, onCopy } = useClipboard(codeString)
  const { setNotification } = useNotification()

  return (
    <DashboardSectionItem title='Installation Tag'>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 0fr' }}
        alignItems='center'
        gap={3}
      >
        <GridItem>
          <SyntaxHighlighter
            language='html'
            style={oneLight}
            lineProps={{
              style: {
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
                backgroundColor: '#f1f5f9'
              }
            }}
            wrapLines={true}
            customStyle={{
              padding: '10px 18px 10px 18px',
              borderRadius: '8px',
              userSelect: 'all',
              backgroundColor: '#f1f5f9'
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </GridItem>
        <GridItem>
          <PrimaryButton
            leftIcon={<Icon as={hasCopied ? HiCheck : HiClipboardCopy} />}
            onClick={() => {
              onCopy()
              setNotification({
                type: 'success',
                title: 'Installation Tag Copied!'
              })
            }}
          >
            {hasCopied ? 'Copied!' : 'Copy'}
          </PrimaryButton>
        </GridItem>
      </Grid>
    </DashboardSectionItem>
  )
}
