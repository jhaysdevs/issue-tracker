'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import AssigneeFilterWrapper from '@/app/issues/_components/AssigneeFilterWrapper'
import IssueStatusFilterWrapper from '@/app/issues/_components/IssueStatusFilterWrapper'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

const IssueActions = () => {
  const { status } = useSession()

  return (
    <Flex my='3' justify='between' align='center' gap='3' className='flex-col sm:flex-row'>
      <Flex gap='3' align='center' className='order-2 sm:order-1'>
        <IssueStatusFilterWrapper />
        <AssigneeFilterWrapper />
      </Flex>
      {status === 'authenticated' && (
        <Button asChild className='!order-1 !sm:order-2'>
          <Link href='/issues/new'>
            <Pencil2Icon />
            New Issue
          </Link>
        </Button>
      )}
    </Flex>
  )
}

export default IssueActions
