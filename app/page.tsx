import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'
import { Container, Flex } from '@radix-ui/themes'

import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import { StatusBadges } from './lib/status'

export default async function Home() {
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

  // Create count map by key
  const countMap = Object.fromEntries(statusCounts.map(({ key, count }) => [key, count]))

  // Create statuses array with count
  const statuses = StatusBadges.filter((status) => status.key !== 'ALL').map((status) => ({
    label: status.label,
    value: status.key,
    color: status.color || 'gray',
    count: countMap[status.key] || 0,
  }))

  return (
    <Container>
      <Flex direction={{ initial: 'column', md: 'row' }} gap='5' mb='5'>
        <Flex direction='column' gap='5'>
          <IssueSummary statuses={statuses} />
          <IssueChart statuses={statuses} />
        </Flex>
        <LatestIssues grow />
      </Flex>
    </Container>
  )
}
