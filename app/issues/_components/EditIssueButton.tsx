import Link from 'next/link'

import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

interface EditIssueButtonProps extends React.ComponentProps<typeof Button> {
  issueId: number
}

const EditIssueButton = ({ issueId, ...props }: EditIssueButtonProps) => {
  return (
    <Button asChild {...props}>
      <Link href={`/issues/edit/${issueId}`}>
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  )
}

export default EditIssueButton
