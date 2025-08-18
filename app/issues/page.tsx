import IssuesTable from '@/app/issues/_components/IssuesTable'
import { prisma } from '@/prisma/client'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()

  return <IssuesTable issues={issues} />
}

export const dynamic = 'force-dynamic'

export default IssuesPage
