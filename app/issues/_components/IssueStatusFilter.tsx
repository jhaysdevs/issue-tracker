'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useIssueContext, useStatus } from '@/app/providers'
import { Badge, Select } from '@radix-ui/themes'

const IssueStatusFilter = () => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { statusBadges } = useStatus()

  // Always call useIssueContext - it will throw if not in provider, but that's expected
  const { selectedStatus, setSelectedStatus, isLoading } = useIssueContext()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const status = searchParams.get('status')
      setSelectedStatus(status || 'ALL')
    }
  }, [searchParams, setSelectedStatus, mounted])

  return (
    <Select.Root
      value={selectedStatus === 'ALL' ? '' : selectedStatus}
      onValueChange={(status: string) => {
        const query = status && status !== 'ALL' ? `?status=${status}` : ''
        router.push(`/issues${query}`)
        setSelectedStatus(status)
      }}
      disabled={isLoading || !mounted}>
      <Select.Trigger
        placeholder={!mounted ? 'Loading...' : isLoading ? 'Loading...' : 'Filter by status...'}
      />
      <Select.Content>
        {statusBadges.map((status) => (
          <Select.Item key={status.key} value={status.key}>
            <Badge color={status.color}>{status.label}</Badge>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
