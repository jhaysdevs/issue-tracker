import Spinner from '@/app/components/Spinner'
import { Button } from '@radix-ui/themes'
import { FaSave } from 'react-icons/fa'

interface UpdateIssueButtonProps {
  onClick: () => void
  isSubmitting: boolean
}

const UpdateIssueButton = ({ onClick, isSubmitting }: UpdateIssueButtonProps) => {
  const buttonContent = isSubmitting ? (
    <>
      <FaSave />
      Updating Issue
      <Spinner />
    </>
  ) : (
    <>
      <FaSave />
      Update Issue
    </>
  )

  return <Button onClick={onClick}>{buttonContent}</Button>
}

export default UpdateIssueButton
