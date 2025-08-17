'use client'

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
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

const AssigneeSelect = ({ users }: { users: User[] }) => {
	if (!users) return null

	return (
		<Select.Root defaultValue=''>
			<Select.Trigger placeholder='Assign...' />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{users.map((user: User) => (
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
	)
}

export default AssigneeSelect