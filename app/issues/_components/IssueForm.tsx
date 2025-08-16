'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { Issue } from '@/app/generated/prisma'
import { issueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type IssueFormData = z.infer<typeof issueSchema>

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter()
	const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema)
	})
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onSubmit = async (data: IssueFormData) => {
		setIsSubmitting(true)
		if (issue) {
			await axios.patch(`/api/issues/${issue?.id}`, data)
				.then(() => {
					router.push('/issues')
					setIsSubmitting(false)
				})
				.catch(err => {
					setError(err.response.data)
					setIsSubmitting(false)
				})
		} else {
			await axios.post(`/api/issues/${issue?.id}`, data)
			.then(() => {
				router.push('/issues')
				setIsSubmitting(false)
			})
			.catch(err => {
				setError(err.response.data)
				setIsSubmitting(false)
			})
		}
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
				<TextField.Root placeholder='Title' defaultValue={issue?.title} {...register('title')}>
					<TextField.Slot />
				</TextField.Root>
				{errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
				<Controller
					control={control}
					defaultValue={issue?.description || undefined}
					name='description'
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				{errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
				<Button disabled={isSubmitting}>{issue ? 'Update Issue' : 'Submit New Issue'}{' '} {isSubmitting && <Spinner />}</Button>
			</form>
		</div>
  )
}

export default IssueForm
