import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import authOptions from '@/app/auth/authOptions'
import { issueSchema } from '@/app/validationSchemas'
import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const where = status && status !== 'ALL' ? { status: status as Status } : {}

  const issues = await prisma.issue.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(issues)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.issues[0].message, { status: 400 })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  })

  return NextResponse.json(newIssue, { status: 201 })
}
