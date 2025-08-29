import { Status } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'

import Link from './components/Link'
import StatusBadge from './issues/_components/IssueStatusBadge'
import { getBadgeColorHex } from './lib/colors'

interface IssueSummaryProps {
  statuses: {
    label: string
    value: string
    color: string
    count: number
  }[]
}

const IssueSummary = ({ statuses }: IssueSummaryProps) => {
  return (
    <Flex direction='column'>
      <Heading size='4' mb='5'>
        Issues Summary
      </Heading>
      <Flex gap='4' wrap='wrap' direction={{ initial: 'column', xs: 'row' }}>
        {statuses.map((status) => (
          <Card key={status.value}>
            <Link
              href={`/issues?status=${status.value}`}
              style={{ color: getBadgeColorHex(status.color) }}>
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

export default IssueSummary
