'use client'

import React, { PropsWithChildren } from 'react'

import { Theme } from '@radix-ui/themes'

type AccentColor = 
  | 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' | 'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' | 'brown' | 'orange' | 'sky' | 'mint' | 'lime' | 'yellow' | 'amber' | 'gold' | 'bronze' | 'gray'

type GrayColor = 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand'

interface ThemeProviderProps extends PropsWithChildren {
  accentColor?: AccentColor
  grayColor?: GrayColor
}

const ThemeProvider = ({ 
  children, 
  accentColor = 'lime', 
  grayColor = 'mauve' 
}: ThemeProviderProps) => {
  return (
    <Theme accentColor={accentColor} grayColor={grayColor}>
      {children}
    </Theme>
  )
}

export default ThemeProvider
