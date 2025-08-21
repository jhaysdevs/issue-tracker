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
  const assignee = searchParams.get('assignee')
  const orderBy = searchParams.get('orderBy')
  const orderDirection = searchParams.get('orderDirection')

  console.log('api/issues searchParams:', searchParams)
  console.log('api/issues assignee:', assignee)

  // Build where clause
  const where: Prisma.IssueWhereInput = {}

  if (status && status !== 'ALL') {
    where.status = status as Status
  }

  if (assignee && assignee === 'unassigned') {
    // Filter for unassigned issues
    where.assignedTo = null
    console.log('Filtering for unassigned issues')
  } else if (assignee && assignee !== 'all') {
    where.assignedTo = assignee
    console.log('Filtering by assignee:', assignee)
  }

  console.log('api/issues where:', where)

  // Build orderBy object based on parameters
  let orderByObject: Prisma.IssueOrderByWithRelationInput = { createdAt: 'desc' }

  if (orderBy) {
    const direction: Prisma.SortOrder = orderDirection === 'asc' ? 'asc' : 'desc'

    if (orderBy === 'assignee') {
      orderByObject = { assignee: { name: direction } }
    } else {
      orderByObject = { [orderBy]: direction } as Prisma.IssueOrderByWithRelationInput
    }
  }

  const issues = await prisma.issue.findMany({
    where,
    include: { assignee: true }, // so you can see the User
    orderBy: orderByObject,
  })

  console.log('api/issues findMany:', {
    where,
    include: { assignee: true }, // so you can see the User
    orderBy: orderByObject,
  })

  console.log('api/issues results count:', issues.length)
  console.log(
    'api/issues results:',
    issues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      assignedTo: issue.assignedTo,
      assignee: issue.assignee?.name,
    }))
  )

  return NextResponse.json(issues, { status: 200 })
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
