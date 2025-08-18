'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { TableCellLink } from '@/app/components/TableCellLink'
import { Issue } from '@/app/generated/prisma'
import { useIssueContext } from '@/app/issues/_components/IssueContext'
import { formatDate } from '@/app/lib/utils'
import { StatusBadges } from '@/lib/status'
import { Container, Table } from '@radix-ui/themes'
import axios from 'axios'

import IssueStatusBadge from './IssueStatusBadge'

const IssuesTableClient = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const { selectedStatus, isLoading, setIsLoading } = useIssueContext()

  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true)
      try {
        const url =
          selectedStatus && selectedStatus !== 'ALL'
            ? `/api/issues?status=${selectedStatus}`
            : '/api/issues'
        const response = await axios.get(url)
        setIssues(response.data)
      } catch (error) {
        console.error('Error fetching issues:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIssues()
  }, [selectedStatus, setIsLoading])

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
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues && issues.length > 0 ? (
            issues.map((issue) => (
              <Table.Row key={issue.id} className='cursor-pointer hover:bg-gray-100'>
                <Table.Cell>
                  <TableCellLink
                    href={`/issues/${issue.id}`}
                    color={
                      StatusBadges.find((s) => s.key === issue.status)?.color || ('gray' as any)
                    }>
                    {issue.title}
                  </TableCellLink>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <Link href={`/issues/${issue.id}`} className='block w-full hover:underline'>
                    <IssueStatusBadge status={issue.status} />
                  </Link>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <Link href={`/issues/${issue.id}`} className='block w-full hover:underline'>
                    {formatDate(issue.createdAt)}
                  </Link>
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
