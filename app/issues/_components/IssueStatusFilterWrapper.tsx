'use client'

import { Suspense } from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssueStatusFilterWrapper = () => {
  return (
    <Suspense fallback={<div>Loading filter...</div>}>
      <IssueStatusFilter />
    </Suspense>
  )
}

export default IssueStatusFilterWrapper
