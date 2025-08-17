import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// TODO: refactor this to add sort order, pagination, search, etc.
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
