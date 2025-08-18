'use client'

import Link from 'next/link'

import IssueStatusFilter from '@/app/issues/_components/IssueStatusFilter'
import { Button, Flex } from '@radix-ui/themes'

const IssueActions = () => {
  return (
    <Flex mb='5' justify='between'>
      <IssueStatusFilter />
      <Button asChild>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
