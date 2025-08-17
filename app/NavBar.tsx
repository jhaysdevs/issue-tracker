'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Container, Flex } from '@radix-ui/themes'

const NavBar = () => {
	const currentPath = usePathname()
	const { status, data: session } = useSession()

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
						{status === 'authenticated' && (
							<Link href='/api/auth/signout'>Logout</Link>
						)}
						{status === 'unauthenticated' && (
							<Link href='/api/auth/signin'>Login</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
  )
}

export default NavBar