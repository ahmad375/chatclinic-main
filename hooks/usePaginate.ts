'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export const usePaginate = (): { page: number } => {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)

  useEffect(() => {
    try {
      const param = searchParams.get('p') as string | null
      if (!param) throw new Error()
      const p = parseInt(param as string)
      if (isNaN(p)) throw new Error()
      setPage(p)
    } catch {
      setPage(1)
    }
  }, [searchParams])

  return {
    page
  }
}
