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

  // Responsive bar size based on screen width
  useEffect(() => {
    const updateBarSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        // sm
        setBarSize(20)
      } else if (width < 768) {
        // md
        setBarSize(25)
      } else if (width < 1024) {
        // lg
        setBarSize(30)
      } else {
        // xl and above
        setBarSize(35)
      }
    }

    updateBarSize()
    window.addEventListener('resize', updateBarSize)
    return () => window.removeEventListener('resize', updateBarSize)
  }, [])

  const handleBarClick = (data: any) => {
    if (data && data.status) {
      router.push(`/issues?status=${data.status}`)
    }
  }

  console.log('IssueChart data:', data)

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
