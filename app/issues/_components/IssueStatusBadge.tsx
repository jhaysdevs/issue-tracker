import { useStatus } from '@/app/providers'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const IssueStatusBadge = ({
  status,
  ...props
}: { status: Status } & React.ComponentProps<typeof Badge>) => {
  const { getStatusByKey } = useStatus()
  const statusConfig = getStatusByKey(status)

  return (
    <Badge color={statusConfig?.color} {...props}>
      {statusConfig?.label}
    </Badge>
  )
}

export default IssueStatusBadge
