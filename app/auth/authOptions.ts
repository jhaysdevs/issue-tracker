import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma/client'
import { NextAuthOptions } from 'next-auth'

// Ensure Prisma client is properly initialized
if (!prisma) {
  throw new Error('Prisma client is not initialized')
}

// Create adapter with explicit configuration
const adapter = PrismaAdapter(prisma)

const authOptions: NextAuthOptions = {
  // Temporarily comment out adapter to test OAuth flow
  // adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //     scope: 'openid email profile',
      //   },
      // },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

export default authOptions