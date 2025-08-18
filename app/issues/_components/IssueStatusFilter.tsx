'use client'

import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const statuses = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'On Hold', value: 'ON_HOLD' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Archived', value: 'ARCHIVED' },
]

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
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
