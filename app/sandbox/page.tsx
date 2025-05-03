import { notFound } from 'next/navigation'

export default function SandboxPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return null
}
