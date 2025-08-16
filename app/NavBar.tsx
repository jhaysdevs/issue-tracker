'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'

const NavBar = () => {
	const currentPath = usePathname()
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	]

  return (
    <nav className='flex items-center space-x-6 border-b mb-5 px-5 h-14'>
			<Link href="/">
				<AiFillBug className='text-2xl' />
			</Link>
			<ul className='flex space-x-6'>
				{links.map(link => (
					<li key={link.href}>
						<Link 
							className={classnames({
								'text-zinc-100': link.href === currentPath,
								'text-zinc-400': link.href !== currentPath,
								'hover:text-zinc-100 transition-colors': true
							})}
							href={link.href}>
								{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
  )
}

export default NavBar