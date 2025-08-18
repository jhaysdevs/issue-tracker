'use client'

import React, { PropsWithChildren } from 'react'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

interface FontProviderProps extends PropsWithChildren {
  className?: string
}

const FontProvider = ({ children, className = '' }: FontProviderProps) => {
  return (
    <div className={`${inter.variable} ${className}`}>
      {children}
    </div>
  )
}

export default FontProvider
