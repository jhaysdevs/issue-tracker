'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import Pagination from '@/app/components/Pagination'
import AssigneeFilterWrapper from '@/app/issues/_components/AssigneeFilterWrapper'
import IssueStatusFilterWrapper from '@/app/issues/_components/IssueStatusFilterWrapper'
import { useIssueContext } from '@/app/providers'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

const IssueActions = () => {
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')
  const perPage = parseInt(searchParams.get('perPage') || '10')
  const { totalCount } = useIssueContext()

  return (
    <Flex mb='2' justify='between' align='center' gap='3'>
      <Flex gap='3' align='center'>
        <IssueStatusFilterWrapper />
        <AssigneeFilterWrapper />
      </Flex>
      <Pagination
        perPage={perPage}
        currentPage={currentPage}
        itemCount={totalCount}
        className='hidden md:flex'
      />
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
