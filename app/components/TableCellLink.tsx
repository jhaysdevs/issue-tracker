import Link from './Link'
import { Flex } from '@radix-ui/themes'

interface TableCellLinkProps extends React.ComponentProps<typeof Link> {
  href: string
  children: React.ReactNode
}

export const TableCellLink = ({ href, children, ...props }: TableCellLinkProps) => {
  return (
    <Flex
      style={{
        margin: 'calc(-1 * var(--table-cell-padding))',
        width: 'calc(100% + var(--table-cell-padding) * 2)',
        height: 'calc(100% + var(--table-cell-padding) * 2)',
        alignItems: 'center',
      }}>
      <Link
        href={href}
        style={{
          width: '100%',
          padding: 'var(--table-cell-padding)',
        }}
        {...props}>
        {children}
      </Link>
    </Flex>
  )
}
