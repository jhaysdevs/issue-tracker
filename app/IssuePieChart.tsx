'use client'

import { useRouter } from 'next/navigation'

import { Card, Heading } from '@radix-ui/themes'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { getBadgeColorHex } from './lib/colors'

interface IssuePieChartProps {
  statuses: {
    label: string
    value: string
    color: string
    count: number
  }[]
}

const IssuePieChart = ({ statuses }: IssuePieChartProps) => {
  const router = useRouter()

  const data = statuses.map((status) => ({
    name: status.label,
    value: status.count,
    color: status.color,
    status: status.value,
  }))

  const handlePieClick = (data: unknown) => {
    const chartData = data as { status?: string }
    if (chartData && chartData.status) {
      router.push(`/issues?status=${chartData.status}`)
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className='bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg'>
          <p className='text-gray-200 font-medium'>{data.name}</p>
          <p className='text-gray-300'>
            Count: <span className='font-semibold'>{data.value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <Heading size='4' mb='4'>
        Issues by Status
      </Heading>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            cursor='pointer'
            onClick={handlePieClick}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBadgeColorHex(entry.color)} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssuePieChart
