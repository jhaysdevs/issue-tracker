'use client'

import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const BackButton = () => {
	const router = useRouter()

	return (
		<Button color='gray' variant='soft' onClick={() => router.back()}>
			<ArrowLeftIcon />
			Back
		</Button>
	)
}

export default BackButton