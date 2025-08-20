import IssueActions from '@/app/issues/_components/IssueActions'
import IssueTableClient from '@/app/issues/_components/IssueTableClient'
import { IssueContextDebug, IssueProvider } from '@/app/providers'

const IssuesPage = () => {
  return (
    <IssueProvider>
      <IssueActions />
      <IssueTableClient />
      <IssueContextDebug />
    </IssueProvider>
  )
}

export default IssuesPage
