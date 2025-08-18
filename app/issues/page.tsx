import { IssueProvider, IssueContextDebug } from '@/app/issues/_components/IssueContext'
import IssuesTable from '@/app/issues/_components/IssuesTable'

const IssuesPage = () => {
  return (
    <IssueProvider>
      <IssueContextDebug />
      <IssuesTable />
    </IssueProvider>
  )
}

export default IssuesPage
