import { getServerSession } from 'next-auth'

import authOptions from '@/app/auth/authOptions'
import { BackButton } from '@/app/components'
import { Issue } from '@prisma/client'
import { Flex } from '@radix-ui/themes'

import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'

const IssueEditActions = async ({ issue }: { issue: Issue }) => {
  const session = await getServerSession(authOptions)

  if (!session) return null

  return (
    <Flex direction={{ initial: 'column', sm: 'row' }} gap='2'>
      <EditIssueButton issueId={issue.id} />
      <DeleteIssueButton issueId={issue.id} />
      <BackButton ml={{ initial: '0', sm: 'auto' }} />
    </Flex>
  )
}

export default IssueEditActions
