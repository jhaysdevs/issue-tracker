import { Status } from '@prisma/client'
import { z } from 'zod'

export const issueSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535),
  assignedTo: z.string().min(1, 'Assignee is required').max(255).optional().nullable(),
  status: z.enum(Object.values(Status)).optional(),
})

export const issuePatchSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  assignedTo: z.string().min(1, 'Assignee is required').max(255).optional().nullable(),
  status: z.enum(Object.values(Status)).optional(),
})
