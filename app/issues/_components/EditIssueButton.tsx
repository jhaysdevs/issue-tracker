'use client'

import { useState } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Pencil2Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

interface EditIssueButtonProps extends React.ComponentProps<typeof Button> {
  issueId: number
}

const EditIssueButton = ({ issueId, ...props }: EditIssueButtonProps) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleEditClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      setShowAuthDialog(true)
    }
  }

  return (
    <>
      <Button asChild {...props} onClick={handleEditClick}>
        <a href={`/issues/edit/${issueId}`}>
          <Pencil2Icon />
          Edit Issue
        </a>
      </Button>

      {showAuthDialog && (
        <AlertDialog.Root open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <AlertDialog.Content>
            <AlertDialog.Title>Authentication Required</AlertDialog.Title>
            <AlertDialog.Description>
              You must be logged in to edit issues. Please sign in to continue.
            </AlertDialog.Description>
            <Flex gap='3' mt='4'>
              <AlertDialog.Cancel>
                <Button variant='soft' color='gray'>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <Button
                color='blue'
                onClick={() =>
                  router.push(
                    `/api/auth/signin?callbackUrl=${encodeURIComponent(`/issues/edit/${issueId}`)}`
                  )
                }>
                Sign In
              </Button>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  )
}

export default EditIssueButton
