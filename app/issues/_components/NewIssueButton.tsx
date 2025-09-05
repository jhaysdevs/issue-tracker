'use client'

import { useState } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Pencil2Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

interface NewIssueButtonProps extends React.ComponentProps<typeof Button> {}

const NewIssueButton = ({ ...props }: NewIssueButtonProps) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleNewIssueClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      setShowAuthDialog(true)
    }
  }

  return (
    <>
      <Button asChild {...props} onClick={handleNewIssueClick}>
        <a href='/issues/new'>
          <Pencil2Icon />
          New Issue
        </a>
      </Button>

      {showAuthDialog && (
        <AlertDialog.Root open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <AlertDialog.Content>
            <AlertDialog.Title>Authentication Required</AlertDialog.Title>
            <AlertDialog.Description>
              You must be logged in to create new issues. Please sign in to continue.
            </AlertDialog.Description>
            <Flex gap='3' mt='4'>
              <AlertDialog.Cancel>
                <Button variant='soft' color='gray'>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <Button color='blue' onClick={() => router.push('/api/auth/signin')}>
                Sign In
              </Button>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  )
}

export default NewIssueButton
