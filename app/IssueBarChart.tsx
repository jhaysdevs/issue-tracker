'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Card } from '@radix-ui/themes'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { getBadgeColorHex } from './lib/colors'

interface IssueBarChartProps {
  statuses: {
    label: string
    value: string
    color: string
    count: number
  }[]
}

const IssueBarChart = ({ statuses }: IssueBarChartProps) => {
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

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: Array<{ payload: { label: string; value: number; color: string; status: string } }>
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className='bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg'>
          <p className='text-gray-200 font-medium'>{data.label}</p>
          <p className='text-gray-300'>
            Total Issues: <span className='font-semibold'>{data.value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={data}
          style={{ outline: 'none', marginLeft: '-20px' }}
          className='[&_*]:outline-none [&_.recharts-tooltip-cursor]:!fill-transparent'>
          <XAxis dataKey='label' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={false} />
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

export default IssueBarChart
