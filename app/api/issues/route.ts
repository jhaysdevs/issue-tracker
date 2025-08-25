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
  const currentPage = parseInt(searchParams.get('currentPage') || '1')
  const perPage = parseInt(searchParams.get('perPage') || '10')

  console.log('api/issues searchParams:', searchParams)

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

    // Validate orderBy is a valid column
    const validColumns = [
      'id',
      'title',
      'description',
      'status',
      'createdAt',
      'updatedAt',
      'assignedTo',
    ]

    if (orderBy === 'assignee') {
      // For assignee sorting, we'll handle it manually in the query
      // to properly sort unassigned issues
      orderByObject = { createdAt: 'desc' } // Default fallback
    } else if (validColumns.includes(orderBy)) {
      orderByObject = { [orderBy]: direction } as Prisma.IssueOrderByWithRelationInput
    } else {
      // Invalid orderBy, use default
      orderByObject = { createdAt: 'desc' }
    }
  }

  console.log('api/issues findMany:', {
    where,
    include: { assignee: true }, // so you can see the User
    orderBy: orderByObject,
    skip: (currentPage - 1) * perPage,
    take: perPage,
  })

  // Get total count of issues that match the filters
  const totalCount = await prisma.issue.count({ where })

  let issues
  if (orderBy === 'assignee') {
    // For assignee sorting, we need to handle unassigned issues properly
    // We'll fetch all issues and sort them in memory to handle null assignees correctly
    const allIssues = await prisma.issue.findMany({
      where,
      include: { assignee: true },
    })

    // Sort issues by assignee name, treating unassigned as 'Unassigned'
    issues = allIssues.sort((a, b) => {
      const aName = a.assignee?.name || 'Unassigned'
      const bName = b.assignee?.name || 'Unassigned'

      if (orderDirection === 'asc') {
        return aName.localeCompare(bName)
      } else {
        return bName.localeCompare(aName)
      }
    })

    // Apply pagination after sorting
    const startIndex = (currentPage - 1) * perPage
    issues = issues.slice(startIndex, startIndex + perPage)
  } else {
    // For other sorting, use Prisma's built-in sorting
    issues = await prisma.issue.findMany({
      where,
      include: { assignee: true },
      orderBy: orderByObject,
      skip: (currentPage - 1) * perPage,
      take: perPage,
    })
  }

  console.log('api/issues results count:', issues.length)
  console.log('api/issues total count:', totalCount)
  console.log(
    'api/issues results:',
    issues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      assignedTo: issue.assignedTo,
      assignee: issue.assignee?.name,
    }))
  )

  return NextResponse.json({ issues, totalCount }, { status: 200 })
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
