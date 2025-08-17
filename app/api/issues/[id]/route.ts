import authOptions from '@/app/auth/authOptions'
import { prisma } from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { issuePatchSchema } from '@/app/validationSchemas'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // const session = await getServerSession(authOptions)
  // if (!session)
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  
  const validation = issuePatchSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.issues[0].message, { status: 400 })
  }

  const { title, description, assignedTo } = body;
  if (assignedTo) {
    const user = await prisma.user.findUnique({ where: { id: assignedTo } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid assignee' }, { status: 400 })
    }
  }

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } })
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedTo },
  })

  return NextResponse.json(updatedIssue, { status: 201 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } })
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  const deletedIssue = await prisma.issue.delete({ where: { id: issue.id } })
  return NextResponse.json(deletedIssue, { status: 200 })
}
