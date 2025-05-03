'use client'
import type { FC } from 'react'

export const ChatwizardScript: FC = () => {
  // Demo account for development
  if (process.env.NODE_ENV === 'development')
    return (
      <script
        defer
        src='http://localhost:3000/api/js/v1/aGaNYrkBqekpOuv7qNdDO'
      ></script>
    )

  return (
    <script
      defer
      src={`${process.env.NEXT_PUBLIC_APP_URI}/api/js/v1/MZIcuUcTacDisOih_lBwD`}
    ></script>
  )
}
