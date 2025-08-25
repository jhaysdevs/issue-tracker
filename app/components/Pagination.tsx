'use client'

import { useState } from 'react'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'

interface PaginationProps {
  itemCount: number
  perPage: number
  currentPage?: number
}

const Pagination = ({ itemCount, perPage, currentPage = 1 }: PaginationProps) => {
  if (!itemCount || !perPage) return null
  const pageCount = Math.ceil(itemCount / perPage)
  const validCurrentPage = currentPage > pageCount ? pageCount : currentPage

  const [page, setPage] = useState(validCurrentPage)

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return false
    setPage(newPage)
  }

  return (
    <Flex align='center' gap='2'>
      <Button
        variant='soft'
        size='1'
        color='gray'
        disabled={page === 1}
        onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant='soft'
        size='1'
        color='gray'
        disabled={page === 1}
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
        disabled={page === pageCount}
        onClick={() => changePage(page + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button
        variant='soft'
        size='1'
        color='gray'
        disabled={page === pageCount}
        onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination
