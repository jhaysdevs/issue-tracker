'use client'

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

  const data = statuses.map((status) => ({
    label: status.label,
    value: status.count,
    color: status.color,
    status: status.value,
  }))

  const handleBarClick = (data: any) => {
    if (data && data.status) {
      router.push(`/issues?status=${data.status}`)
    }
  }

  console.log('IssueChart data:', data)

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} style={{ outline: 'none' }} className='[&_*]:outline-none'>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar dataKey='value' barSize={30} cursor='pointer' onClick={handleBarClick}>
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
