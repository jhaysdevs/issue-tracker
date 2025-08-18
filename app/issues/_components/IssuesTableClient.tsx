'use client'

import { useEffect, useState } from 'react'

import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'

import { TableCellLink } from '@/app/components/TableCellLink'
import { Issue } from '@/app/generated/prisma'
import { formatDate } from '@/app/lib/utils'
import { useIssueContext, useStatus } from '@/app/providers'
import { Container, Table } from '@radix-ui/themes'
import axios from 'axios'

import IssueStatusBadge from './IssueStatusBadge'

const IssuesTableClient = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const { selectedStatus, isLoading, setIsLoading } = useIssueContext()
  const { getStatusColor } = useStatus()

  const searchParams = useSearchParams()
  const orderBy = searchParams.get('orderBy')
  const orderDirection = searchParams.get('orderDirection')

  // Convert URLSearchParams to plain object
  const searchParamsObject = Object.fromEntries(searchParams.entries())

  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()

        if (selectedStatus && selectedStatus !== 'ALL') {
          params.append('status', selectedStatus)
        }

        if (orderBy) {
          params.append('orderBy', orderBy)
        }

        if (orderDirection) {
          params.append('orderDirection', orderDirection)
        }

        const queryString = params.toString()
        const url = `/api/issues${queryString ? `?${queryString}` : ''}`

        const response = await axios.get(url)
        setIssues(response.data)
      } catch (error) {
        console.error('Error fetching issues:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIssues()
  }, [selectedStatus, orderBy, orderDirection, setIsLoading])

  if (isLoading) {
    return (
      <Container>
        <div className='flex justify-center items-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <NextLink
                href={{
                  query: {
                    ...searchParamsObject,
                    orderBy: 'title',
                    orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
                  },
                }}>
                Title
              </NextLink>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              <NextLink
                href={{
                  query: {
                    ...searchParamsObject,
                    orderBy: 'status',
                    orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
                  },
                }}>
                Status
              </NextLink>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              <NextLink
                href={{
                  query: {
                    ...searchParamsObject,
                    orderBy: 'createdAt',
                    orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
                  },
                }}>
                Created
              </NextLink>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues && issues.length > 0 ? (
            issues.map((issue) => (
              <Table.Row key={issue.id} className='cursor-pointer hover:bg-gray-100'>
                <Table.Cell>
                  <TableCellLink href={`/issues/${issue.id}`} color={getStatusColor(issue.status)}>
                    {issue.title}
                  </TableCellLink>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <NextLink href={`/issues/${issue.id}`} className='block w-full hover:underline'>
                    <IssueStatusBadge status={issue.status} />
                  </NextLink>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <NextLink href={`/issues/${issue.id}`} className='block w-full hover:underline'>
                    {formatDate(issue.createdAt)}
                  </NextLink>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3} className='text-center py-8 text-gray-500'>
                No issues found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}

export default IssuesTableClient
