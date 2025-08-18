import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import authOptions from '@/app/auth/authOptions'
import { issueSchema } from '@/app/validationSchemas'
import { prisma } from '@/prisma/client'
import { Prisma, Status } from '@prisma/client'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const orderBy = searchParams.get('orderBy')
  const orderDirection = searchParams.get('orderDirection')

  const where = status && status !== 'ALL' ? { status: status as Status } : {}

  // Build orderBy object based on parameters
  let orderByObject: Prisma.IssueOrderByWithRelationInput = { createdAt: 'desc' } // default
  if (orderBy) {
    const direction: Prisma.SortOrder = orderDirection === 'asc' ? 'asc' : 'desc'
    orderByObject = { [orderBy]: direction } as Prisma.IssueOrderByWithRelationInput
  }

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderByObject,
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
