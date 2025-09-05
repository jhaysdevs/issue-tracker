'use client'

import { useState } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Spinner from '@/app/components/Spinner'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'

const DeleteIssueButton = ({
  issueId,
  ...props
}: { issueId: number } & React.ComponentProps<typeof Button>) => {
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleDeleteClick = () => {
    if (!session) {
      setShowAuthDialog(true)
    } else {
      setShowConfirmDialog(true)
    }
  }

  const deleteIssue = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')
      router.refresh()
    } catch (err) {
      console.error(err)
      setIsDeleting(false)
      setError(true)
    }
  }

  return (
    <>
      <Button
        color='red'
        disabled={isDeleting}
        className='w-full min-w-0 text-center'
        onClick={handleDeleteClick}
        {...props}>
        <TrashIcon />
        Delete Issue {isDeleting && <Spinner />}
      </Button>

      <AlertDialog.Root open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap='3' mt='4'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={deleteIssue}>
                <TrashIcon />
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {error && (
        <AlertDialog.Root open={error} onOpenChange={setError}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
            <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>
              OK
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
      {showAuthDialog && (
        <AlertDialog.Root open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <AlertDialog.Content>
            <AlertDialog.Title>Authentication Required</AlertDialog.Title>
            <AlertDialog.Description>
              You must be logged in to delete issues. Please sign in to continue.
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

export default DeleteIssueButton
