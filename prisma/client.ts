import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load environment variables depending on context
if (process.env.VERCEL_ENV) {
  console.log('Running in Vercel')
  // Vercel will inject env vars automatically from the dashboard
  // This is just a safeguard if you also commit .env files for preview/prod
  if (process.env.VERCEL_ENV === 'production') {
    dotenv.config({ path: '.env.production' })
  } else if (process.env.VERCEL_ENV === 'preview') {
    dotenv.config({ path: '.env.preview' })
  } else if (process.env.VERCEL_ENV === 'development') {
    dotenv.config({ path: '.env.local' })
  }
} else if (process.env.NODE_ENV === 'development') {
  // Local dev (not running on Vercel)
  dotenv.config({ path: '.env.local' })
} else {
  // Fallback
  dotenv.config({ path: '.env' })
}

console.log('Running in:', process.env.VERCEL_ENV || process.env.NODE_ENV)

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
