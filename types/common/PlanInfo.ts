import type { ReactNode } from 'react'

export interface PlanInfo {
  description: string
  amount: number
  features: ReactNode[]
  highlighted?: boolean
  priceId: string
}
