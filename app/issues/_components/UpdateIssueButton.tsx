import { FaSave } from 'react-icons/fa'
import { Button } from '@radix-ui/themes'
import Spinner from '@/app/components/Spinner'

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
