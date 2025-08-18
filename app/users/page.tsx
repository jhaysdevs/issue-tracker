'use client'

import { useEffect, useState } from 'react'

import AssigneeSelect from '@/app/issues/_components/AssigneeSelect'
import { Issue } from '@prisma/client'
import axios from 'axios'

export default function UsersList({ issue }: { issue: Issue }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/users')
      setUsers(data.users)
    }
    fetchUsers()
  }, [])

  return <AssigneeSelect issue={issue} />
}
