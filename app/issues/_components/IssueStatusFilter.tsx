'use client'

import { useCallback, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useIssueContext, useStatus } from '@/app/providers'
import { Badge, Select, Skeleton } from '@radix-ui/themes'

const IssueStatusFilter = () => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { statusBadges } = useStatus()

  // Always call useIssueContext - it will throw if not in provider, but that's expected
  const { selectedStatus, setSelectedStatus, isLoading } = useIssueContext()

  const handleStatusChange = useCallback(
    (status: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      if (status === 'ALL' || status === '') {
        newSearchParams.delete('status')
      } else {
        newSearchParams.set('status', status)
      }

      const queryString = newSearchParams.toString()
      const newUrl = `/issues${queryString ? `?${queryString}` : ''}`

      // Update URL without full page refresh using replace
      router.replace(newUrl, { scroll: false })
      setSelectedStatus(status)
    },
    [searchParams, router, setSelectedStatus]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const status = searchParams.get('status')
      setSelectedStatus(status || 'ALL')
    }
  }, [searchParams, setSelectedStatus, mounted])

  if (isLoading) return <Skeleton height='2rem' width='10rem' />

  return (
    <Select.Root
      value={selectedStatus === 'ALL' ? '' : selectedStatus}
      onValueChange={handleStatusChange}
      disabled={!mounted}>
      <Select.Trigger placeholder='Filter by status...' />
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
