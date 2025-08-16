'use client'

import dynamic from 'next/dynamic'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueForm = z.infer<typeof createIssueSchema>

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const NewIssuePage = () => {
	const router = useRouter()
	const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema)
	})
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onSubmit = async (data: IssueForm) => {
		setIsSubmitting(true)
		await axios.post('/api/issues', data)
			.then(() => {
				router.push('/issues')
				setIsSubmitting(false)
			})
			.catch(err => {
				setError(err.response.data)
				setIsSubmitting(false)
			})
	}

  return (
		<div className='max-w-xl'>
			{error && 
				<Callout.Root color='red' className='mb-5' variant='soft'>
					<Callout.Icon>
						<InfoCircledIcon />
					</Callout.Icon>
					<Callout.Text>
						{error}
					</Callout.Text>
				</Callout.Root>
			}
			<form 
				className='space-y-3'
				onSubmit={handleSubmit(onSubmit)}>
				<TextField.Root placeholder='Title' {...register('title')}>
					<TextField.Slot />
				</TextField.Root>
				{errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
				<Controller
					control={control}
					name='description'
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				{errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
				<Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
			</form>
		</div>
  )
}

export default NewIssuePage
