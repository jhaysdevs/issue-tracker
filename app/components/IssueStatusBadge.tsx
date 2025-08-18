import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import { StatusBadges } from '@/lib/status'

const IssueStatusBadge = ({
  status,
  ...props
}: { status: Status } & React.ComponentProps<typeof Badge>) => {
  const statusConfig = StatusBadges.find((s) => s.key === status)

  return (
    <Badge color={statusConfig?.color} {...props}>
      {statusConfig?.label}
    </Badge>
  )
}

export default IssueStatusBadge
