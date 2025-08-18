import { prisma } from '@/prisma/client'
import IssuesTable from '@/app/issues/_components/IssuesTable'

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany()

	return (
		<IssuesTable issues={issues} />
	)
}

export const dynamic = 'force-dynamic'

export default IssuesPage
