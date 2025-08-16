import { z } from 'zod'

export const issueSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, 'Title is required').max(255),
	description: z.string().min(1, 'Description is required'),
});
