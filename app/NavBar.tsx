'use client'

import { useSession } from 'next-auth/react'
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
      <div className='mx-auto px-3'>
        <Flex justify='between' align='center' py='3'>
          <Flex align='center' gap='2'>
            <Link href='/' style={{ marginLeft: '5px' }}>
              <AiFillBug className='text-2xl' />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
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
    <NavigationMenu.Root className='flex'>
      <NavigationMenu.List className='flex'>
        {links.map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link asChild>
              <Link
                className={classnames(
                  'block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  {
                    'bg-accent text-accent-foreground': link.href === currentPath,
                  }
                )}
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

const AuthStatus = () => {
  const { status: isLoggedIn, data: session } = useSession()
  const { theme, toggleTheme } = useTheme()

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
            {session?.user?.name && <Text>Hi, {session?.user?.name.split(' ')[0]}</Text>}
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
          <DropdownMenu.Item onClick={toggleTheme}>
            <Flex align='center' gap='2' className='cursor-pointer w-full'>
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              <Text>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Text>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link className='w-full nav-link' href='/api/auth/signout'>
              <strong>Logout</strong>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar
