'use client'

import Link from 'next/link'

import AssigneeFilterWrapper from '@/app/issues/_components/AssigneeFilterWrapper'
import IssueStatusFilterWrapper from '@/app/issues/_components/IssueStatusFilterWrapper'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

const IssueActions = () => {
  return (
    <Flex mb='5' justify='between' align='center' gap='3'>
      <Flex gap='3'>
        <IssueStatusFilterWrapper />
        <AssigneeFilterWrapper />
      </Flex>
      <Button asChild>
        <Link href='/issues/new'>
          <Pencil2Icon />
          New Issue
        </Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
