import { ChatwizardScript } from '@/components/scripts'
import type { LayoutProps } from '@/types'

export default function SandboxLayout({ children }: LayoutProps) {
  return (
    <>
      <ChatwizardScript />
      {children}
    </>
  )
}
