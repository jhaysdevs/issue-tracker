'use client'

import { useRouter } from 'next/navigation'

import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const BackButton = ({ ...props }: React.ComponentProps<typeof Button>) => {
  const router = useRouter()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.back()
  }

  return (
    <Button
      color={props.color || 'gray'}
      variant={props.variant || 'soft'}
      onClick={handleClick}
      {...props}>
      <ArrowLeftIcon />
      Back
    </Button>
  )
}

export default BackButton
