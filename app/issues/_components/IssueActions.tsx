'use client'

import Link from 'next/link'

import IssueStatusFilterWrapper from '@/app/issues/_components/IssueStatusFilterWrapper'
import { Button, Flex } from '@radix-ui/themes'

const IssueActions = () => {
  return (
    <Flex mb='5' justify='between'>
      <IssueStatusFilterWrapper />
      <Button asChild>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
