import IssueActions from '@/app/issues/_components/IssueActions'
import IssueTableClient from '@/app/issues/_components/IssueTableClient'
import { IssueProvider } from '@/app/providers'

const IssuesPage = () => {
  return (
    <IssueProvider>
      <IssueActions />
      <IssueTableClient />
    </IssueProvider>
  )
}

export default IssuesPage
