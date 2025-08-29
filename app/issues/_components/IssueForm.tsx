'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import { BackButton } from '@/app/components'
import ErrorMessage from '@/app/components/ErrorMessage'
import { Issue } from '@/app/generated/prisma'
import AssigneeSelect from '@/app/issues/_components/AssigneeSelect'
import IssueStatusUpdate from '@/app/issues/_components/IssueStatusUpdate'
import { issueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Container, Flex, Separator, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import UpdateIssueButton from './UpdateIssueButton'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: IssueFormData) => {
    setIsSubmitting(true)
    if (issue) {
      await axios
        .patch(`/api/issues/${issue?.id}`, data)
        .then(() => {
          router.push('/issues')
          router.refresh()
          setIsSubmitting(false)
        })
        .catch((err) => {
          setError(err.response.data)
          setIsSubmitting(false)
        })
    } else {
      await axios
        .post(`/api/issues`, data)
        .then(() => {
          router.push('/issues')
          router.refresh()
          setIsSubmitting(false)
        })
        .catch((err) => {
          setError(err.response.data)
          setIsSubmitting(false)
        })
    }
  }

  return (
    <Container>
      {error && (
        <Callout.Root color='red' className='mb-5' variant='soft'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify='between' align='center' mb='3'>
          <BackButton />
          <UpdateIssueButton onClick={handleSubmit(onSubmit)} isSubmitting={isSubmitting} />
        </Flex>
        <Separator />
        <TextField.Root
          className='mb-3'
          placeholder='Title'
          defaultValue={issue?.title}
          {...register('title')}>
          <TextField.Slot />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          control={control}
          defaultValue={issue?.description || undefined}
          name='description'
          render={({ field }) => (
            <>
              <SimpleMDE placeholder='Description' {...field} />
              <input
                type='hidden'
                name='description'
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </>
          )}
        />
        {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
        {issue && (
          <Flex gap='2'>
            <Controller
              control={control}
              defaultValue={issue.status}
              name='status'
              render={({ field }) => (
                <IssueStatusUpdate
                  value={field.value}
                  onChange={field.onChange}
                  defaultValue={field.value}
                />
              )}
            />
            <AssigneeSelect issue={issue} />
          </Flex>
        )}
      </form>
    </Container>
  )
}

export default IssueForm
