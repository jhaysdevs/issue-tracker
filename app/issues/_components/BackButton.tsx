'use client'

import { useRouter } from 'next/navigation'

import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const BackButton = ({ ...props }: React.ComponentProps<typeof Button>) => {
  const router = useRouter()

  return (
    <Button
      color={props.color || 'gray'}
      variant={props.variant || 'soft'}
      onClick={() => router.back()}
      {...props}>
      <ArrowLeftIcon />
      Back
    </Button>
  )
}

export default BackButton
