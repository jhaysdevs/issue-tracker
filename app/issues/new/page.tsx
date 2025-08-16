'use client'

import dynamic from 'next/dynamic'
import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'

interface IssueForm {
	title: string
	description: string
}

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const NewIssuePage = () => {
	const router = useRouter()
	const { register, control, handleSubmit } = useForm<IssueForm>()

  return (
    <form 
			className='max-w-xl space-y-3'
			onSubmit={handleSubmit(async (data) => {
			axios.post('/api/issues', data).then(() => {
				router.push('/issues')
			})
		})}>
      <TextField.Root placeholder='Title' {...register('title')}>
        <TextField.Slot />
      </TextField.Root>
			<Controller
				control={control}
				name='description'
				render={({ field }) => (
					<SimpleMDE placeholder='Description' {...field} />
				)}
			/>
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
