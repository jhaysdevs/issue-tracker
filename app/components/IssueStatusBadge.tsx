import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<
	Status, { label: string, color: 'red' | 'violet' | 'green' | 'orange' | 'gray' | 'blue' | 'yellow' }
> = {
	[Status.OPEN]: { label: 'Open', color: 'red' },
	[Status.IN_PROGRESS]: { label: 'In Progress', color: 'blue' },
	[Status.CLOSED]: { label: 'Closed', color: 'gray' },
	[Status.ON_HOLD]: { label: 'On Hold', color: 'orange' },
	[Status.CANCELLED]: { label: 'Cancelled', color: 'red' },
	[Status.COMPLETED]: { label: 'Completed', color: 'green' },
	[Status.ARCHIVED]: { label: 'Archived', color: 'yellow' },
}

const IssueStatusBadge = ({ status, ...props }: { status: Status } & React.ComponentProps<typeof Badge>) => {
	return (
		<Badge color={statusMap[status].color} {...props}>{statusMap[status].label}</Badge>
	)
}

export default IssueStatusBadge