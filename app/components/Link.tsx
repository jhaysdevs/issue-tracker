import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'
import * as React from 'react'

// Extend both, but keep them separate
interface LinkProps extends NextLinkProps, React.ComponentProps<typeof RadixLink> {
  href: string
  children: React.ReactNode
}

const Link = ({ href, children, ...props }: LinkProps) => {
  // Split Radix vs Next.js props
  const {
    // Radix props (color, underline, etc.)
    color,
    highContrast,
    size,
    underline,
    weight,
    ...nextProps
  } = props

  return (
    <RadixLink
      asChild
      color={color}
      highContrast={highContrast}
      size={size}
      underline={underline}
      weight={weight}>
      <NextLink href={href} {...nextProps}>
        {children}
      </NextLink>
    </RadixLink>
  )
}

export default Link
