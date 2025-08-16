import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
	params: { id: string }
}

const DetailPage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) }
	})

	if (!issue)
		notFound()

	return (
		<div>
			<Heading>{issue.title}</Heading>
			<Text>{issue.description}</Text>
			<IssueStatusBadge status={issue.status} />
			<Text>{issue.createdAt.toLocaleDateString()}</Text>
		</div>
	)
}

export default DetailPage