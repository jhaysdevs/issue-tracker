'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useTheme } from '@/app/providers'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Button, Select, Text } from '@radix-ui/themes'

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
  const [editingPage, setEditingPage] = useState<string>(validCurrentPage.toString())
  const [isEditing, setIsEditing] = useState(false)
  const [inputWidth, setInputWidth] = useState<number>(0)
  const { theme } = useTheme()

  // Update page state when currentPage prop changes
  useEffect(() => {
    setPage(validCurrentPage)
    setEditingPage(validCurrentPage.toString())
  }, [validCurrentPage])

  // Calculate input width based on content
  const calculateInputWidth = (text: string) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      context.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      const width = context.measureText(text).width
      return Math.max(width + 16, 32) // Add padding and minimum width
    }
    return 32 // Fallback minimum width
  }

  // Update input width when editing or page changes
  useEffect(() => {
    const text = isEditing ? editingPage : page.toString()
    setInputWidth(calculateInputWidth(text))
  }, [isEditing, editingPage, page])

  // Don't render pagination if perPage is invalid
  if (perPage < 1 || page > pageCount) return null

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return false
    setPage(newPage)
    setEditingPage(newPage.toString())
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', newPage.toString())
    newSearchParams.set('perPage', perPage.toString())
    router.push(`?${newSearchParams.toString()}`)
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      const numValue = parseInt(value)
      if (numValue > pageCount) {
        setEditingPage(pageCount.toString())
      } else {
        setEditingPage(value)
      }
    }
  }

  const handlePageInputBlur = () => {
    setIsEditing(false)
    const newPage = parseInt(editingPage)
    if (!isNaN(newPage) && newPage >= 1 && newPage <= pageCount) {
      changePage(newPage)
    } else {
      setEditingPage(page.toString())
    }
  }

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditingPage(page.toString())
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const currentValue = parseInt(editingPage) || 1
      const newValue = Math.min(currentValue + 1, pageCount)
      setEditingPage(newValue.toString())
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const currentValue = parseInt(editingPage) || 1
      const newValue = Math.max(currentValue - 1, 1)
      setEditingPage(newValue.toString())
    }
  }

  return (
    <div className='flex flex-col'>
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
        <Text size='2' color='gray' className='flex items-center gap-1'>
          Page{' '}
          <input
            type='text'
            value={isEditing ? editingPage : page}
            onChange={handlePageInputChange}
            onFocus={() => setIsEditing(true)}
            onBlur={handlePageInputBlur}
            onKeyDown={handlePageInputKeyDown}
            className={`text-center border rounded px-1 py-0.5 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 ${
              theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600'
            }`}
            style={{ width: `${inputWidth}px` }}
          />{' '}
          of <span className='font-medium'>{pageCount}</span>
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
      <div className='flex items-center justify-center gap-2'>
        <Text size='2' color='gray'>
          Showing
        </Text>
        <Select.Root
          value={perPage.toString()}
          onValueChange={(value) => {
            const newPerPage = parseInt(value)
            const newSearchParams = new URLSearchParams(searchParams.toString())
            newSearchParams.set('perPage', newPerPage.toString())
            newSearchParams.set('page', '1') // Reset to first page when changing perPage
            router.push(`?${newSearchParams.toString()}`)
          }}
          size='1'>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value='10'>10</Select.Item>
            <Select.Item value='25'>25</Select.Item>
            <Select.Item value='50'>50</Select.Item>
            <Select.Item value='100'>100</Select.Item>
          </Select.Content>
        </Select.Root>
        <Text size='2' color='gray'>
          items per page of {itemCount}
        </Text>
      </div>
    </div>
  )
}

export default Pagination
