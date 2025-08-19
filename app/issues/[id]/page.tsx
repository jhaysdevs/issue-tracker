import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import authOptions from '@/app/auth/authOptions'
import { BackButton } from '@/app/components'
import AssigneeSelect from '@/app/issues/_components/AssigneeSelect'
import DeleteIssueButton from '@/app/issues/_components/DeleteIssueButton'
import EditIssueButton from '@/app/issues/_components/EditIssueButton'
import { prisma } from '@/prisma/client'
import { Flex } from '@radix-ui/themes'

import IssueDetails from './IssueDetails'

interface Props {
  params: Promise<{ id: string }>
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  })

  if (!issue) notFound()

  const session = await getServerSession(authOptions)

  return (
    <Flex direction={{ initial: 'column', sm: 'row' }} className='w-full'>
      <Flex direction={{ initial: 'column' }} className='flex-1'>
        <IssueDetails issue={issue} />
      </Flex>
      {session && (
        <Flex
          direction={{ initial: 'row', sm: 'column' }}
          flexGrow='1'
          gap='2'
          wrap='wrap'
          className='md:max-w-[20%] md:ml-5'>
          <EditIssueButton issueId={issue.id} />
          <BackButton />
          <AssigneeSelect issue={issue} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Flex>
  )
}

export default IssueDetailPage
