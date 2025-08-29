'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Card } from '@radix-ui/themes'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { getBadgeColorHex } from './lib/colors'

interface IssueChartProps {
  statuses: {
    label: string
    value: string
    color: string
    count: number
  }[]
}

const IssueChart = ({ statuses }: IssueChartProps) => {
  const router = useRouter()
  const [barSize, setBarSize] = useState(30)

  const data = statuses.map((status) => ({
    label: status.label,
    value: status.count,
    color: status.color,
    status: status.value,
  }))

  // Responsive bar size based on screen width (mobile-first)
  useEffect(() => {
    const updateBarSize = () => {
      const width = window.innerWidth
      // Mobile first: start with smallest, then scale up
      if (width >= 1024) {
        // xl and above
        setBarSize(65)
      } else if (width >= 768) {
        // lg
        setBarSize(60)
      } else if (width >= 640) {
        // md
        setBarSize(45)
      } else {
        // sm and below (mobile)
        setBarSize(30)
      }
    }

    updateBarSize()
    window.addEventListener('resize', updateBarSize)
    return () => window.removeEventListener('resize', updateBarSize)
  }, [])

  const handleBarClick = (data: unknown) => {
    const chartData = data as { status?: string }
    if (chartData && chartData.status) {
      router.push(`/issues?status=${chartData.status}`)
    }
  }

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={data}
          style={{ outline: 'none', marginLeft: '-20px' }}
          className='[&_*]:outline-none'>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar dataKey='value' barSize={barSize} cursor='pointer' onClick={handleBarClick}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBadgeColorHex(entry.color)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
