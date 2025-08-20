import IssueEditActions from '@/app/issues/_components/IssueEditActions'
import IssueStatusBadgeServer from '@/app/issues/_components/IssueStatusBadgeServer'
import { formatDate } from '@/app/lib/utils'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Flex direction={{ initial: 'column' }} className='w-full md-pr-5'>
      <Flex gap='4' direction='column' mb='2'>
        <Heading>{issue.title}</Heading>
        <IssueEditActions issue={issue} />
      </Flex>
      <Card className='prose w-full max-w-full min-h-100'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Flex gap='4' my='2' justify='between' align='center'>
        <IssueStatusBadgeServer status={issue.status} size='3' />
        <Text color='gray' size='2'>
          {formatDate(issue.createdAt)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default IssueDetails
