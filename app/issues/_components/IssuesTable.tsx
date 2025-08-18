import IssueActions from '@/app/issues/_components/IssueActions'
import IssuesTableClient from '@/app/issues/_components/IssuesTableClient'

const IssuesTable = () => {
  return (
    <>
      <IssueActions />
      <IssuesTableClient />
    </>
  )
}

export default IssuesTable
