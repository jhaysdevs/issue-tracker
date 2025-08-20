import { notFound } from 'next/navigation'

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

  return (
    <Flex direction={{ initial: 'column', sm: 'row' }} className='w-full'>
      <Flex direction={{ initial: 'column' }} className='flex-1'>
        <IssueDetails issue={issue} />
      </Flex>
    </Flex>
  )
}

export default IssueDetailPage
