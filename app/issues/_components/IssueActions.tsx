'use client'

import { useEffect, useRef } from 'react'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import AssigneeFilterWrapper from '@/app/issues/_components/AssigneeFilterWrapper'
import IssueStatusFilterWrapper from '@/app/issues/_components/IssueStatusFilterWrapper'
import { ArrowRightIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'

// Global flag to track if toast has been shown in this session
let hasShownAuthToast = false

const IssueActions = () => {
  const { status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated' && !hasShownAuthToast) {
      // toast.custom(
      //   (t) => (
      //     <div
      //       style={{
      //         display: 'flex',
      //         alignItems: 'center',
      //         justifyContent: 'space-between',
      //         padding: '8px 10px',
      //         background: 'var(--color-panel)',
      //         color: 'var(--color-foreground)',
      //         border: '1px solid var(--gray-6)',
      //         borderRadius: '8px',
      //         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      //         minWidth: '400px',
      //         minHeight: '56px',
      //       }}>
      //       <span style={{ flex: 1, marginRight: '16px' }}>
      //         There are elements on this page that require an authenticated user. Click the "Login"
      //         link on the right.
      //       </span>
      //       <ArrowRightIcon width='28' height='28' style={{ color: 'var(--gray-11)' }} />
      //     </div>
      //   ),
      //   {
      //     duration: 5000,
      //   }
      // )
      // hasShownAuthToast = true
    }
  }, [status])

  return (
    <Flex mb='3' justify='between' align='center' gap='3' className='flex-col sm:flex-row'>
      <Flex gap='3' align='center' className='order-2 sm:order-1'>
        <IssueStatusFilterWrapper />
        <AssigneeFilterWrapper />
      </Flex>
      <Button asChild className='!order-1 !sm:order-2'>
        <Link href='/issues/new'>
          <Pencil2Icon />
          New Issue
        </Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
