import IssuesTableClient from '@/app/issues/_components/IssuesTableClient'
import { IssueContextDebug, IssueProvider } from '@/app/providers'

const IssuesPage = () => {
  return (
    <IssueProvider>
      <IssueContextDebug />
      <IssuesTableClient />
    </IssueProvider>
  )
}

export default IssuesPage
