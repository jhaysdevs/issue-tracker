'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/app/components'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

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

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, error, isLoading } = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get('/api/users').then((res) => res.data.users),
		staleTime: 1000 * 60, // 60s
		retry: 3, // times to retry if the request fails
		retryDelay: 1000, // delay between retries
	})

	if (isLoading) return <Skeleton height='5' width='250px' />
	if (error || !users) return null

	return (
		<>
			<Select.Root defaultValue={issue.assignedTo || ''} onValueChange={(userId) => {
				axios.patch(`/api/issues/${issue.id}`, {
					assignedTo: userId === '0' || null ? null : userId,
				}).catch((error) => {
					toast.error('Error assigning issue')
				})
			}}>
				<Select.Trigger placeholder='Assign...' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value='0'>Unassigned</Select.Item>
						{users?.map((user: User) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
					<Select.Separator />
					<Select.Group>
						<Select.Label>Vegetables</Select.Label>
						<Select.Item value='carrot'>Carrot</Select.Item>
						<Select.Item value='potato'>Potato</Select.Item>
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	)
}

export default AssigneeSelect