import { prisma } from '@/prisma/client'
import { Container, Flex, Grid } from '@radix-ui/themes'

import IssueChart from './IssueChart'
import IssuePieChart from './IssuePieChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import { StatusBadges } from './lib/status'

const Home = async () => {
  // Get counts for all status types (excluding 'ALL')
  const statusCounts = await Promise.all(
    StatusBadges.filter((status) => status.key !== 'ALL').map(async (status) => {
      const count = await prisma.issue.count({
        where: {
          status: status.key as any,
        },
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
    <Container size='4'>
      <Flex direction='column' gap='6' className='pb-8'>
        <IssueSummary statuses={statuses} />

        <Grid columns={{ initial: '1', md: '2' }} gap='6'>
          <IssueChart statuses={statuses} />
          <IssuePieChart statuses={statuses} />
        </Grid>

        <LatestIssues />
      </Flex>
    </Container>
  )
}

export default Home
