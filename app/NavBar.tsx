'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MoonIcon, PersonIcon, SunIcon } from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, Skeleton, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { AiFillBug } from 'react-icons/ai'

import { useTheme } from './providers'

const NavBar = () => {
  const { theme } = useTheme()

  return (
    <nav
      className='fixed top-0 start-0 end-0 z-50 border-bottom bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      style={{
        borderColor:
          theme === 'light'
            ? 'color(display-p3 0.098 0.008 0.224 / 0.126)'
            : 'lab(16.1051 -1.18239 -11.7533)',
      }}>
      <div className='container-fluid px-2 px-sm-3 px-md-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center gap-2'>
            <Link href='/' className='text-decoration-none pl-0 py-2 py-md-3'>
              <AiFillBug className='fs-4 fs-md-3' />
            </Link>
            <NavLinks />
          </div>
          <div className='d-flex align-items-center gap-1 gap-sm-2'>
            <ThemeToggle />
            <AuthStatus />
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          className={classnames(
            'nav-link position-relative d-block text-decoration-none rounded px-2 px-sm-3 py-2 py-md-3 fw-medium text-nowrap transition-all h-100',
            {
              'nav-link-active': link.href === currentPath,
            }
          )}
          href={link.href}>
          <span className='d-none d-sm-inline'>{link.label}</span>
          <span className='d-sm-none'>{link.label.charAt(0)}</span>
        </Link>
      ))}
    </>
  )
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='btn btn-link p-1 p-sm-2 py-2 py-md-3 text-decoration-none border-0 bg-transparent'
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <span className='transition-all'>
        {theme === 'light' ? (
          <MoonIcon width={18} height={18} className='d-sm-none' />
        ) : (
          <SunIcon width={18} height={18} className='d-sm-none' />
        )}
        {theme === 'light' ? (
          <MoonIcon width={20} height={20} className='d-none d-sm-inline' />
        ) : (
          <SunIcon width={20} height={20} className='d-none d-sm-inline' />
        )}
      </span>
    </button>
  )
}

const AuthStatus = () => {
  const { status: isLoggedIn, data: session } = useSession()
  const pathname = usePathname()

  // Define protected routes from middleware matcher
  const protectedRoutes = ['/issues/new', '/issues/edit', '/users']
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname.startsWith(route) || pathname.match(/^\/issues\/edit\/\d+/)
  )

  const handleLogout = () => {
    // If on a protected route, redirect to dashboard, otherwise stay on current page
    const redirectUrl = isProtectedRoute ? '/' : pathname
    signOut({ callbackUrl: redirectUrl })
  }

  if (isLoggedIn === 'loading') return <Skeleton width='3rem' />
  if (isLoggedIn === 'unauthenticated')
    return (
      <Link
        className='login-link nav-link btn btn-link text-decoration-none pr-0 py-2 py-md-3'
        href={`/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`}>
        <strong className='small'>Login</strong>
      </Link>
    )

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className='btn btn-link p-1 p-sm-2 text-decoration-none border-0 bg-transparent'>
          <div className='d-flex align-items-center gap-1 gap-sm-2'>
            {session?.user?.name && (
              <span id='logged-in-user' className='d-none d-sm-inline small'>
                Hi, {session?.user?.name.split(' ')[0]}
              </span>
            )}
            {session?.user?.image ? (
              <Avatar
                src={session?.user?.image}
                fallback='?'
                size='2'
                radius='full'
                referrerPolicy='no-referrer'
                className='rounded-circle'
              />
            ) : (
              <PersonIcon width={18} height={18} className='d-sm-none' />
            )}
            {!session?.user?.image && (
              <PersonIcon width={20} height={20} className='d-none d-sm-inline' />
            )}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {session!.user!.email && (
            <DropdownMenu.Label>
              <Text className='small'>{session!.user!.email}</Text>
            </DropdownMenu.Label>
          )}
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={handleLogout}>
            <strong className='small'>Logout</strong>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}

export default NavBar
