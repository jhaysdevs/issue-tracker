import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data.users),
    staleTime: 1000 * 60 * 10080,
    retry: 3,
  })
