import { getStatusByKey } from '@/app/lib/status'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const IssueStatusBadgeServer = ({
  status,
  ...props
}: { status: Status } & React.ComponentProps<typeof Badge>) => {
  const statusConfig = getStatusByKey(status)

  return (
    <Badge color={statusConfig?.color} {...props}>
      {statusConfig?.label}
    </Badge>
  )
}

export default IssueStatusBadgeServer
