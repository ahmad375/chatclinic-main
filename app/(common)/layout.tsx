import { CommonLayout } from '@/components/layouts'
import { ChatwizardScript } from '@/components/scripts'
import type { LayoutProps } from '@/types'
import { ElementsProvider } from '@/components/providers'

export default function __CommonLayout({ children }: LayoutProps) {
  return (
    <ElementsProvider>
      <CommonLayout>
        <ChatwizardScript />
        {children}
      </CommonLayout>
    </ElementsProvider>
  )
}
