import IssueTableClient from '@/app/issues/_components/IssueTableClient'
import { IssueContextDebug, IssueProvider } from '@/app/providers'

const IssuesPage = () => {
  return (
    <IssueProvider>
      <IssueContextDebug />
      <IssueTableClient />
    </IssueProvider>
  )
}

export default IssuesPage
