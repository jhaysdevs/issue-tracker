import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'

const IssueFormSkeleton = () => {
  return (
    <Box className='full-width'>
      <Skeleton height='2rem' />
      <Skeleton height='20rem' />
    </Box>
  )
}

export default IssueFormSkeleton
