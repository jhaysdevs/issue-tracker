import { IssueStatusBadge } from '@/app/components'
import { formatDate } from '@/app/lib/utils'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Flex direction={{ initial: 'column' }} className='w-full md-pr-5'>
      <Flex gap='4' justify='between'>
        <Heading>{issue.title}</Heading>
      </Flex>
      <Flex gap='4' my='2' justify='between' align='center'>
        <IssueStatusBadge status={issue.status} size='3' />
        <Text color='gray' size='2'>
          {formatDate(issue.createdAt)}
        </Text>
      </Flex>
      <Card className='prose w-full max-w-full min-h-100 mb-5'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Flex>
  )
}

export default IssueDetails
