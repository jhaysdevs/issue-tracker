import authOptions from '@/app/auth/authOptions'
import { prisma } from '@/prisma/client'
import { Box, Container, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import BackButton from '../_components/BackButton'
import DeleteIssueButton from '../_components/DeleteIssueButton'
import EditIssueButton from '../_components/EditIssueButton'
import IssueDetails from './IssueDetails'
interface Props {
	params: Promise<{ id: string }>
}

const IssueDetailPage = async ({ params }: Props) => {
	const { id } = await params
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) }
	})
	
	if (!issue) notFound()
		
	const session = await getServerSession(authOptions);

	return (
		<Container>
			<Grid columns={{ initial: '1', md: '2' }} gap='5'>
				<Box>
					<IssueDetails issue={issue} />
				</Box>
				{session && (
				<Flex gap='4' wrap='wrap'>
					<BackButton />
					<EditIssueButton issueId={issue.id} />
					<DeleteIssueButton issueId={issue.id} />
				</Flex>
				)}
			</Grid>
		</Container>
	)
}

export default IssueDetailPage