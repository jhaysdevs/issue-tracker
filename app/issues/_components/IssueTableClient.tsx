'use client'

import { useEffect, useState } from 'react'

import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'

import Pagination from '@/app/components/Pagination'
import { TableCellLink } from '@/app/components/TableCellLink'
import { Issue, User } from '@/app/generated/prisma'
import { formatDate } from '@/app/lib/utils'
import { IssueContextDebug, useIssueContext, useStatus } from '@/app/providers'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Container, Flex, Table } from '@radix-ui/themes'
import axios from 'axios'

import IssueStatusBadge from './IssueStatusBadge'

type IssueWithAssignee = Issue & { assignee: User }

interface ApiResponse {
  issues: IssueWithAssignee[]
  totalCount: number
}

const IssueTableClient = () => {
  const [issues, setIssues] = useState<IssueWithAssignee[]>([])
  const { isLoading, setIsLoading, setTotalCount, totalCount } = useIssueContext()
  const { getStatusColor } = useStatus()

  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const assignee = searchParams.get('assignee')
  const orderBy = searchParams.get('orderBy')
  const orderDirection = searchParams.get('orderDirection')
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = parseInt(searchParams.get('perPage') || '10')

  // Convert URLSearchParams to plain object
  const searchParamsObject = Object.fromEntries(searchParams.entries())

  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()

        if (status && status !== 'ALL') {
          params.append('status', status)
        }

        if (orderBy) {
          params.append('orderBy', orderBy)
        }

        if (orderDirection) {
          params.append('orderDirection', orderDirection)
        }

        if (assignee) {
          params.append('assignee', assignee)
        }

        if (page) {
          params.append('currentPage', page.toString())
        }

        if (perPage) {
          params.append('perPage', perPage.toString())
        }

        const queryString = params.toString()
        const url = `/api/issues${queryString ? `?${queryString}` : ''}`

        const response = await axios.get<ApiResponse>(url)
        setIssues(response.data.issues)
        setTotalCount(response.data.totalCount)
        console.log('fetchIssues axios.get', { url: url, response: response.data })
      } catch (error) {
        console.error('Error fetching issues:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIssues()
  }, [status, orderBy, orderDirection, assignee, setIsLoading, setTotalCount, page, perPage])

  if (isLoading) {
    return (
      <Container>
        <div className='flex justify-center items-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      </Container>
    )
  }

  const columns = [
    {
      label: 'Title',
      href: {
        query: {
          ...searchParamsObject,
          orderBy: 'title',
          orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
        },
      },
      renderCell: (issue: IssueWithAssignee) => (
        <TableCellLink href={`/issues/${issue.id}`} color={getStatusColor(issue.status)}>
          {issue.title}
        </TableCellLink>
      ),
      className: '',
    },
    {
      label: 'Status',
      href: {
        query: {
          ...searchParamsObject,
          orderBy: 'status',
          orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
        },
      },
      renderCell: (issue: IssueWithAssignee) => (
        <NextLink href={`/issues/${issue.id}`} className='block w-full hover:underline'>
          <IssueStatusBadge status={issue.status} />
        </NextLink>
      ),
      className: 'hidden md:table-cell',
    },
    {
      label: 'Created',
      href: {
        query: {
          ...searchParamsObject,
          orderBy: 'createdAt',
          orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
        },
      },
      renderCell: (issue: IssueWithAssignee) => (
        <NextLink href={`/issues/${issue.id}`} className='block w-full hover:underline'>
          {formatDate(issue.createdAt)}
        </NextLink>
      ),
      className: 'hidden md:table-cell',
    },
    {
      label: 'Assignee',
      href: {
        query: {
          ...searchParamsObject,
          orderBy: 'assignee',
          orderDirection: orderDirection === 'asc' ? 'desc' : 'asc',
        },
      },
      renderCell: (issue: IssueWithAssignee) => (
        <NextLink href={`/issues/${issue.id}`} className='block w-full hover:underline'>
          {issue.assignee?.name || 'Unassigned'}
        </NextLink>
      ),
      className: '',
    },
  ]

  const orderArrow = (columnOrderBy: string) => {
    return orderBy && orderDirection && columnOrderBy === orderBy ? (
      orderDirection === 'asc' ? (
        <ArrowUpIcon className='w-4 h-4' />
      ) : (
        <ArrowDownIcon className='w-4 h-4' />
      )
    ) : null
  }

  return (
    <>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.label} className={column.className}>
                <Flex align='center' gap='2'>
                  <NextLink href={column.href} className='flex items-center gap-2'>
                    {column.label}
                    {orderArrow(column.href.query.orderBy)}
                  </NextLink>
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues && issues.length > 0 ? (
            issues.map((issue) => (
              <Table.Row key={issue.id} className='cursor-pointer hover:bg-gray-100'>
                {columns.map((column) => (
                  <Table.Cell key={column.label} className={column.className}>
                    {column.renderCell(issue)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className='text-center py-8 text-gray-500'>
                No issues found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      <Pagination
        perPage={perPage}
        currentPage={page}
        itemCount={totalCount}
        className='my-3 justify-center'
      />
      <IssueContextDebug className='hidden sm:flex justify-center' />
    </>
  )
}

export default IssueTableClient
