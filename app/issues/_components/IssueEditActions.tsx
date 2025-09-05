import { getServerSession } from 'next-auth'

import authOptions from '@/app/auth/authOptions'
import { BackButton } from '@/app/components'
import { Issue } from '@prisma/client'
import { Flex } from '@radix-ui/themes'

import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'

const IssueEditActions = async ({ issue }: { issue: Issue }) => {
  return (
    <Flex justify='end' direction={{ initial: 'column', sm: 'row' }} gap='2'>
      <BackButton mr={{ initial: '0', sm: 'auto' }} />
      <DeleteIssueButton issueId={issue.id} />
      <EditIssueButton issueId={issue.id} />
    </Flex>
  )
}

export default IssueEditActions
