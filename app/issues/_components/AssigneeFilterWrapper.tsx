'use client'

import { Suspense } from 'react'

import AssigneeFilter from './AssigneeFilter'

const AssigneeFilterWrapper = () => {
  return (
    <Suspense fallback={<div>Loading assignee filter...</div>}>
      <AssigneeFilter />
    </Suspense>
  )
}

export default AssigneeFilterWrapper
