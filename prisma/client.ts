import { PrismaClient } from '@prisma/client'

// Only load .env files when not running locally (not on localhost)
if (process.env.NODE_ENV !== 'development' || process.env.VERCEL_ENV) {
  require('dotenv').config()
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// Only set global prisma instance in development
if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma
}
