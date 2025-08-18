'use client'

import { Select, Badge } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { StatusBadges } from '@/lib/status'

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const status = searchParams.get('status')
    setValue(status || 'ALL')
  }, [searchParams])

  return (
    <Select.Root
      value={value === 'ALL' ? '' : value}
      onValueChange={(status: string) => {
        const query = status && status !== 'ALL' ? `?status=${status}` : ''
        router.push(`/issues${query}`)
        setValue(status)
      }}>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {StatusBadges.map((status) => (
          <Select.Item key={status.key} value={status.key}>
            <Badge color={status.color as any}>{status.label}</Badge>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
