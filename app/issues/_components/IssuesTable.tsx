import { Issue } from '@/app/generated/prisma'
import IssueActions from '@/app/issues/_components/IssueActions'
import IssueStatusBadge from '@/components/IssueStatusBadge'
import { formatDate } from '@/app/lib/utils'
import { Container, Flex, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { TableCellLink } from '@/app/components/TableCellLink'

const IssuesTable = async ({ issues }: { issues: Issue[] }) => {
	return (
		<Container>
			<IssueActions />
			<Table.Root 
				variant='surface' 
			>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues && issues.map(issue => (
						<Table.Row
							key={issue.id}
							className="cursor-pointer hover:bg-gray-100"
						>
							<Table.Cell>
								<TableCellLink href={`/issues/${issue.id}`}>
									{issue.title}
								</TableCellLink>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Link href={`/issues/${issue.id}`} className="block w-full hover:underline">
									<IssueStatusBadge status={issue.status} />
								</Link>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Link href={`/issues/${issue.id}`} className="block w-full hover:underline">
									{formatDate(issue.createdAt)}
								</Link>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Container>
	)
}

export default IssuesTable