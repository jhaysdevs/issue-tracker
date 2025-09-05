import type { Metadata } from 'next'

import '@/app/styles.scss'
import '@/app/theme-config.css'
import '@radix-ui/themes/styles.css'
import 'easymde/dist/easymde.min.css'

import NavBar from './NavBar'
import {
  AuthProvider,
  FontProvider,
  QueryClientProvider,
  StatusProvider,
  ThemeProvider,
} from './providers'

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'A modern issue tracking application',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning>
        {/* <div
          className='bg-wrapper'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        /> */}
        <ThemeProvider>
          <FontProvider>
            <QueryClientProvider>
              <AuthProvider>
                <StatusProvider>
                  <NavBar />
                  <main className='pt-16 px-5'>{children}</main>
                </StatusProvider>
              </AuthProvider>
            </QueryClientProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
