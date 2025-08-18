import Link from './Link'
import { Flex } from '@radix-ui/themes'

interface TableCellLinkProps {
  href: string
	className?: string
  children: React.ReactNode
}

export const TableCellLink = ({ href, className, children }: TableCellLinkProps) => {
  return (
		<Flex
			style={{
				margin: 'calc(-1 * var(--table-cell-padding))',
				width: 'calc(100% + var(--table-cell-padding) * 2)',
				height: 'calc(100% + var(--table-cell-padding) * 2)',
				alignItems: 'center',
			}}
		>
			<Link
				href={href}
				className={className}
				style={{
					width: '100%',
					padding: 'var(--table-cell-padding)'
				}}
			>
				{children}
			</Link>
		</Flex>
  )
}
