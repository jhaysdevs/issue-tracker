import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'
interface LinkProps {
  href: string
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

const Link = ({ href, className, children, style }: LinkProps) => {
  return (
    <RadixLink asChild className={className} style={style}>
      <NextLink href={href}>
        {children}
      </NextLink>
    </RadixLink>
  )
}

export default Link
