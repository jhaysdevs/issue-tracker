'use client'

import { PersonIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {
	const currentPath = usePathname()
	const { status: isLoggedIn, data: session } = useSession()
	const userAvatar = session?.user?.image || 'https://github.com/shadcn.png'

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	]

  return (
    <nav className='border-b mb-5 px-5'>
			<Container>
				<Flex justify='between' align='center' py='3'>
					<Flex align='center'>
						<Link href='/'>
							<AiFillBug className='text-2xl' />
						</Link>
						<ul className='flex space-x-6 px-5'>
							{links.map(link => (
								<li key={link.href}>
									<Link 
										className={classnames({
											'text-zinc-800': link.href === currentPath,
											'text-zinc-400': link.href !== currentPath,
											'hover:text-zinc-900 transition-colors': true
										})}
										href={link.href}>
											{link.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{isLoggedIn === 'authenticated' && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{session?.user?.image ? (
										<Avatar
											src={userAvatar}
											fallback='?'
											size='2'
											radius='full'
											referrerPolicy='no-referrer'
										/>
									) : (
										<PersonIcon />
									)}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
								{session?.user?.email && (
									<DropdownMenu.Label>
										<Text>{session?.user?.email}</Text>
									</DropdownMenu.Label>
								)}
									<DropdownMenu.Item>
										<Link className='w-full' href='/api/auth/signout'>Logout</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
						{isLoggedIn === 'unauthenticated' && (
							<Link className='w-full' href='/api/auth/signin'>Login</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
  )
}

export default NavBar