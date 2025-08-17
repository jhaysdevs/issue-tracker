'use client'

import { Table } from '@radix-ui/themes'
import IssueStatusBadge from '@/components/IssueStatusBadge'
import IssueActions from './IssueActions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Issue } from '@prisma/client'
interface IssuesTableProps {
	issues: Issue[]
}

const IssuesTable = ({ issues }: IssuesTableProps) => {
	const router = useRouter()

	return (
		<div>
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
					{issues.map(issue => (
						<Table.Row key={issue.id} className='hover:bg-gray-100 cursor-pointer' onClick={() => router.push(`/issues/${issue.id}`)}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`} className='block w-full hover:underline'>{issue.title}</Link>
								<div className='block md:hidden'>
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
							<Table.Cell className='hidden md:table-cell'>{issue.createdAt.toLocaleDateString()}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	)
}

export default IssuesTable
