import AssigneeFilterWrapper from '@/app/issues/_components/AssigneeFilterWrapper'
import IssueStatusFilterWrapper from '@/app/issues/_components/IssueStatusFilterWrapper'
import NewIssueButton from '@/app/issues/_components/NewIssueButton'
import { Flex } from '@radix-ui/themes'

const IssueActions = () => {
  return (
    <Flex mb='3' justify='between' align='center' gap='3' className='flex-col sm:flex-row'>
      <Flex gap='3' align='center' className='order-2 sm:order-1'>
        <IssueStatusFilterWrapper />
        <AssigneeFilterWrapper />
      </Flex>
      <NewIssueButton className='!order-1 !sm:order-2' />
    </Flex>
  )
}

export default IssueActions
