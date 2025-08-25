'use client'

import { useEffect, useState } from 'react'

import { Container, Heading, Table, Text } from '@radix-ui/themes'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  image?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/users')
        setUsers(data.users)
      } catch (err) {
        setError('Failed to load users')
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <Container>
        <div className='flex justify-center items-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Text color='red'>{error}</Text>
      </Container>
    )
  }

  return (
    <Container>
      <Heading size='6' mb='4'>
        Users
      </Heading>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.length > 0 ? (
            users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Text weight='medium'>{user.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{user.email}</Text>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={2} className='text-center py-8 text-gray-500'>
                No users found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}
