'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Skeleton } from '@/app/components'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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

    if (assigneeId === 'all' || assigneeId === '') {
      newSearchParams.delete('assignee')
    } else {
      newSearchParams.set('assignee', assigneeId)
    }

    const queryString = newSearchParams.toString()
    const newUrl = `/issues${queryString ? `?${queryString}` : ''}`
    router.push(newUrl)
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
          <Select.Label>Filter by:</Select.Label>
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

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data.users),
    staleTime: 1000 * 60 * 10080,
    retry: 3,
  })

export default AssigneeFilter
