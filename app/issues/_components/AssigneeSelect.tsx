'use client'

import { useEffect, useState } from 'react'

import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

export const GetUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/users')
      setUsers(data.users)
    }
    fetchUsers()
  }, [])

  return users
}

const AssigneeSelect = ({ issue }: { issue: Issue | null }) => {
  if (!issue) return null

  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton height='2rem' width='10rem' />
  if (error || !users) return null

  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedTo: userId === '0' || null ? null : userId,
      })
      .catch((error) => {
        console.error(error)
        toast.error('Error assigning issue')
      })
  }

  return (
    <Select.Root defaultValue={issue.assignedTo || ''} onValueChange={assignIssue}>
      <Select.Trigger placeholder='Assign...' className='w-full min-w-0 text-center' />
      <Select.Content>
        <Select.Group>
          <Select.Item value='0'>Unassigned</Select.Item>
          <Select.Separator />
          <Select.Label>Assign to:</Select.Label>
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

export default AssigneeSelect
