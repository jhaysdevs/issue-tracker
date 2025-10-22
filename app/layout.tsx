import type { Metadata } from 'next'

import '@/app/styles.scss'
import '@/app/theme-config.css'
import '@radix-ui/themes/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
      </head>
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
                  <main className='pt-4 pt-md-5 px-2 px-md-3 px-lg-4'>{children}</main>
                </StatusProvider>
              </AuthProvider>
            </QueryClientProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
