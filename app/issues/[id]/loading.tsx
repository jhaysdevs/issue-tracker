'use client'

import { Box, Card, Flex } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height={40} width="50%" />
      <Flex className="space-x-3 mt-4">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage
