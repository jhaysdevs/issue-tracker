import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'
interface Props {
  href: string
  className?: string
  children: React.ReactNode
}

const Link = ({ href, className, children }: Props) => {
  return (
    <RadixLink asChild className={className}>
      <NextLink href={href}>
        {children}
      </NextLink>
    </RadixLink>
  )
}

export default Link
