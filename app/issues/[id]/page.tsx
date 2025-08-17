import { prisma } from '@/prisma/client'
import { Box, Container, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import IssueDetails from './IssueDetails'
import BackButton from '../_components/BackButton'
import EditIssueButton from '../_components/EditIssueButton'
import DeleteIssueButton from '../_components/DeleteIssueButton'
interface Props {
	params: Promise<{ id: string }>
}

const IssueDetailPage = async ({ params }: Props) => {
	const { id } = await params
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) }
	})

	if (!issue) notFound()

	return (
		<Container>
			<Grid columns={{ initial: '1', md: '2' }} gap='5'>
				<Box>
					<IssueDetails issue={issue} />
				</Box>
				<Flex gap='4' wrap='wrap'>
					<BackButton />
					<EditIssueButton issueId={issue.id} />
					<DeleteIssueButton issueId={issue.id} />
				</Flex>
			</Grid>
		</Container>
	)
}

export default IssueDetailPage