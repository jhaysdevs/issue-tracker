import React from 'react'

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
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify='between' height='100%'>
                  <Flex direction='column' align='start' gap='2' className='w-full'>
                    <TableCellLink href={`/issues/${issue.id}`} color='gray'>
                      {issue.title}
                    </TableCellLink>
                    <IssueStatusBadge status={issue.status} radius='medium' size='2' />
                  </Flex>
                  {issue.assignee && (
                    <Avatar src={issue.assignee.image!} fallback='?' radius='full' size='2' />
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
