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

  // Always call useIssueContext, even if we don't use it initially
  let contextValue
  try {
    contextValue = useIssueContext()
  } catch (error) {
    // Context not available yet, use default values
    contextValue = {
      selectedStatus: 'ALL',
      setSelectedStatus: () => {},
      isLoading: false,
      setIsLoading: () => {},
    }
  }

  const { selectedStatus, setSelectedStatus, isLoading } = contextValue

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
            <Badge color={status.color as any}>{status.label}</Badge>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
