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
	const { data: users, error, isLoading } = useUsers()

	if (isLoading) return <Skeleton height='5' width='250px' />
	if (error || !users) return null

	const assignIssue = (userId: string) => {
		axios.patch(`/api/issues/${issue.id}`, {
			assignedTo: userId === '0' || null ? null : userId,
		}).catch((error) => {
			toast.error('Error assigning issue')
		})
	}

	return (
		<>
			<Select.Root defaultValue={issue.assignedTo || ''} onValueChange={assignIssue}>
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

const useUsers = () => useQuery<User[]>({
	queryKey: ['users'],
	queryFn: () => axios.get('/api/users').then((res) => res.data.users),
	staleTime: 1000 * 60 * 10080,
	retry: 3,
})

export default AssigneeSelect