import React from 'react'

import Link from 'next/link'

import IssueStatusBadge from '@/app/issues/_components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'

import { TableCellLink } from './components/TableCellLink'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      assignee: true,
    },
  })

  return (
    <Card>
      <Heading size='4' mb='5'>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue, index) => (
            <Table.Row key={issue.id}>
              <Table.Cell
                className={index === issues.length - 1 ? '!border-b-0' : ''}
                style={
                  index === issues.length - 1
                    ? ({
                        borderBottom: 'none',
                        '--table-row-box-shadow': 'none',
                      } as React.CSSProperties)
                    : {}
                }>
                <Flex justify='between' height='100%'>
                  <TableCellLink href={`/issues/${issue.id}`} color='gray'>
                    <Flex direction='column' align='start' gap='2' className='w-full'>
                      {issue.title}
                      <IssueStatusBadge status={issue.status} radius='medium' size='2' />
                    </Flex>
                  </TableCellLink>
                  {issue.assignee && (
                    <Link href={`/issues/${issue.id}`} className='flex items-center'>
                      <Avatar src={issue.assignee.image!} fallback='?' radius='full' size='4' />
                    </Link>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
