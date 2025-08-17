import IssueActions from '@/app/issues/_components/IssueActions'
import { formatDate } from '@/app/lib/utilities'
import IssueStatusBadge from '@/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Container, Table } from '@radix-ui/themes'
import Link from 'next/link'

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany()

	return (
		<Container>
			<IssueActions />
			<Table.Root variant='surface'>
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
							className="cursor-pointer hover:bg-gray-100 border-b border-gray-200"
						>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`} className="block w-full hover:underline">
									{issue.title}
									<div className="block md:hidden">
										<IssueStatusBadge status={issue.status} />
									</div>
								</Link>
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

export const dynamic = 'force-dynamic'

export default IssuesPage
