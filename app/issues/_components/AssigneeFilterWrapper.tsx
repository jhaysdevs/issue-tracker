'use client'

import { Suspense } from 'react'

import { Skeleton } from '@radix-ui/themes'

import AssigneeFilter from './AssigneeFilter'

const AssigneeFilterWrapper = () => {
  return (
    <Suspense fallback={<Skeleton height='2rem' width='10rem' />}>
      <AssigneeFilter />
    </Suspense>
  )
}

export default AssigneeFilterWrapper
