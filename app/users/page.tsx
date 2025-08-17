'use client'

import AssigneeSelect, { GetUsers } from '@/app/issues/_components/AssigneeSelect'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UsersList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/users')
      setUsers(data.users)
    }
    fetchUsers()
  }, [])

  return (
		<AssigneeSelect users={users} />
	)
}
