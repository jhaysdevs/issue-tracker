import IssueActions from '@/app/issues/_components/IssueActions'
import IssueTableClient from '@/app/issues/_components/IssueTableClient'
import { Container } from '@radix-ui/themes'

const IssueTable = () => {
  return (
    <Container>
      <IssueActions />
      <IssueTableClient />
    </Container>
  )
}

export default IssueTable
