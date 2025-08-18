'use client'

import { StatusBadges } from '@/lib/status'
import { Status } from '@prisma/client'
import { Badge, Select } from '@radix-ui/themes'

interface IssueStatusUpdateProps {
  value?: Status
  onChange?: (value: Status) => void
  defaultValue?: Status
}

const IssueStatusUpdate = ({ value, onChange, defaultValue }: IssueStatusUpdateProps) => {
  return (
    <Select.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(newValue) => onChange?.(newValue as Status)}>
      <Select.Trigger placeholder='Set status...' />
      <Select.Content>
        {StatusBadges.filter((status) => status.key !== 'ALL').map((status) => (
          <Select.Item key={status.key} value={status.key}>
            <Badge color={status.color as any}>{status.label}</Badge>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusUpdate
