'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MoonIcon, PersonIcon, SunIcon } from '@radix-ui/react-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Avatar, Box, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { AiFillBug } from 'react-icons/ai'

import { useTheme } from './providers'

const NavBar = () => {
  const { theme } = useTheme()

  return (
    <nav
      className='fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      style={{
        borderColor:
          theme === 'light'
            ? 'color(display-p3 0.098 0.008 0.224 / 0.126)'
            : 'lab(16.1051 -1.18239 -11.7533)',
      }}>
      <div className='mx-auto px-5'>
        <Flex justify='between' align='center' py='3'>
          <Flex align='center' gap='2'>
            <Link href='/'>
              <AiFillBug className='text-2xl' />
            </Link>
            <NavLinks />
          </Flex>
          <Flex align='center' gap='2'>
            <ThemeToggle />
            <AuthStatus />
          </Flex>
        </Flex>
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
    <NavigationMenu.Root>
      <NavigationMenu.List className='flex'>
        {links.map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link asChild>
              <Link
                className={classnames(
                  'nav-link relative block select-none rounded-md px-3 py-2 text-base font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  {
                    'bg-accent text-accent-foreground nav-link-active': link.href === currentPath,
                  }
                )}
                style={{ margin: '0 -6px' }}
                href={link.href}>
                {link.label}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='group flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus:bg-accent focus:text-accent-foreground focus:outline-none'
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <span className='transition-transform duration-200 group-hover:rotate-12'>
        {theme === 'light' ? (
          <MoonIcon width={20} height={20} />
        ) : (
          <SunIcon width={20} height={20} />
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
      <Link className='nav-link' href='/api/auth/signin'>
        <strong>Login</strong>
      </Link>
    )

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className='cursor-pointer'>
          <Flex align='center' gap='2'>
            {session?.user?.name && (
              <Text id='logged-in-user' className='hide-below-360'>
                Hi, {session?.user?.name.split(' ')[0]}
              </Text>
            )}
            {session?.user?.image ? (
              <Avatar
                src={session?.user?.image}
                fallback='?'
                size='2'
                radius='full'
                referrerPolicy='no-referrer'
              />
            ) : (
              <PersonIcon />
            )}
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {session!.user!.email && (
            <DropdownMenu.Label>
              <Text>{session!.user!.email}</Text>
            </DropdownMenu.Label>
          )}
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={handleLogout}>
            <strong>Logout</strong>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar
