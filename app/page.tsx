import { Container, Flex } from '@radix-ui/themes'

import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'

export default function Home() {
  return (
    <Container>
      <Flex direction={{ initial: 'column', md: 'row' }} gap='5'>
        <IssueSummary />
        <LatestIssues grow />
      </Flex>
    </Container>
  )
}
