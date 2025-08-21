'use client'

import { Suspense } from 'react'

import { Skeleton } from '@radix-ui/themes'

import IssueStatusFilter from './IssueStatusFilter'

const IssueStatusFilterWrapper = () => {
  return (
    <Suspense fallback={<Skeleton height='2rem' width='10rem' />}>
      <IssueStatusFilter />
    </Suspense>
  )
}

export default IssueStatusFilterWrapper
