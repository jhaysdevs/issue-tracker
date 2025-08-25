'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Button, Text } from '@radix-ui/themes'

type PaginationProps = {
  perPage: number
  itemCount: number
  currentPage?: number
} & Omit<React.ComponentProps<'div'>, 'itemCount' | 'perPage' | 'currentPage'>

const Pagination = ({
  perPage = 10,
  itemCount,
  currentPage = 1,
  className,
  ...props
}: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Math.max(1, Math.ceil(itemCount / perPage))
  const validCurrentPage = Math.min(Math.max(1, currentPage), pageCount)

  const [page, setPage] = useState(validCurrentPage)

  // Update page state when currentPage prop changes
  useEffect(() => {
    setPage(validCurrentPage)
  }, [validCurrentPage])

  // Don't render pagination if perPage is invalid
  if (perPage < 1) return null

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return false
    setPage(newPage)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', newPage.toString())
    newSearchParams.set('perPage', perPage.toString())
    router.push(`?${newSearchParams.toString()}`)
  }

  return (
    <div className={`flex items-center gap-2 ${className || ''}`} {...props}>
      <Button
        variant='soft'
        size='1'
        color='gray'
        disabled={page <= 1}
        onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant='soft'
        size='1'
        color='gray'
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Text size='2' color='gray'>
        Page {page} of {pageCount}
      </Text>
      <Button
        variant='soft'
        size='1'
        color='gray'
        disabled={page >= pageCount}
        onClick={() => changePage(page + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button
        variant='soft'
        size='1'
        color='gray'
        disabled={page >= pageCount}
        onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </div>
  )
}

export default Pagination
