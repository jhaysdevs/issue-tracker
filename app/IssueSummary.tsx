import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'

import Link from './components/Link'
import StatusBadge from './issues/_components/IssueStatusBadge'
import { StatusBadges } from './lib/status'

const IssueSummary = async () => {
  // Get counts for all status types (excluding 'ALL')
  const statusCounts = await Promise.all(
    StatusBadges.filter((status) => status.key !== 'ALL').map(async (status) => {
      const count = await prisma.issue.count({
        where: { status: status.key as Status },
      })
      return {
        key: status.key,
        count,
      }
    })
  )

  // Create a map for easy lookup
  const countMap = Object.fromEntries(statusCounts.map(({ key, count }) => [key, count]))

  const statuses = StatusBadges.filter((status) => status.key !== 'ALL').map((status) => ({
    label: status.label,
    value: status.key,
    color: status.color,
    count: countMap[status.key] || 0,
  }))

  return (
    <Flex direction='column'>
      <Heading size='4' mb='5'>
        Issues Summary
      </Heading>
      <Flex gap='4' wrap='wrap' direction={{ initial: 'column', xs: 'row' }}>
        {statuses.map((status) => (
          <Card key={status.value}>
            <Link href={`/issues?status=${status.value}`} color={status.color}>
              <Flex direction='column' align='center' justify='center' gap='2'>
                <Text size='6' weight='bold'>
                  {status.count}
                </Text>
                <StatusBadge status={status.value as Status} size='3' />
              </Flex>
            </Link>
          </Card>
        ))}
      </Flex>
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export default IssueSummary
