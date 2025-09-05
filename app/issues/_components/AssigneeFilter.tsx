'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Skeleton } from '@/app/components'
import { useUsers } from '@/app/lib/hooks'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'

const AssigneeFilter = () => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: users, error, isLoading } = useUsers()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get current assignee filter from URL
  const currentAssignee = searchParams.get('assignee') || ''

  const handleAssigneeChange = (assigneeId: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    newSearchParams.delete('page')
    newSearchParams.delete('perPage')

    if (assigneeId === 'all' || assigneeId === '') {
      newSearchParams.delete('assignee')
    } else {
      newSearchParams.set('assignee', assigneeId)
    }

    const queryString = newSearchParams.toString()
    const newUrl = `/issues${queryString ? `?${queryString}` : ''}`

    // Update URL without full page refresh using replace
    router.replace(newUrl, { scroll: false })
  }

  if (isLoading) return <Skeleton height='2rem' width='10rem' />
  if (error || !users) return null

  return (
    <Select.Root value={currentAssignee} onValueChange={handleAssigneeChange}>
      <Select.Trigger
        placeholder='Filter by assignee...'
        className='w-full min-w-0 text-center'
        disabled={!mounted}
      />
      <Select.Content>
        <Select.Group>
          <Select.Item value='all'>All Assignees</Select.Item>
          <Select.Item value='unassigned'>Unassigned</Select.Item>
          <Select.Separator />
          {users?.map((user: User) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeFilter
