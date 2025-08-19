'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PersonIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Container, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {
  return (
    <nav className='border-b mb-5 px-5'>
      <Flex justify='between' align='center' py='3'>
        <Flex align='center'>
          <Link href='/'>
            <AiFillBug className='text-2xl' />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
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
    <ul className='flex space-x-6 px-5'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              'nav-link': true,
              'text-zinc-900': link.href === currentPath,
            })}
            href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const AuthStatus = () => {
  const { status: isLoggedIn, data: session } = useSession()

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
