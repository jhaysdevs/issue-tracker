'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const [error, setError] = useState(false)
	const router = useRouter()

	const deleteIssue = async () => {
		try {
			await axios.delete(`/api/issues/${issueId}`)
			router.push('/issues')
			router.refresh()
		} catch (err) {
			console.error(err)
			setError(true)
		}
	}

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color='red'>
						<TrashIcon />
						Delete Issue
					</Button>
				</AlertDialog.Trigger>
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
		</>
	)
}

export default DeleteIssueButton