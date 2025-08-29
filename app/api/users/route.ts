import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/client'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    })
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// TODO: add DELETE, PATCH, POST, etc.
