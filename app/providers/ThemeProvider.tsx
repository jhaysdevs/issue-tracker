'use client'

import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import { Theme } from '@radix-ui/themes'

type AccentColor =
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'brown'
  | 'orange'
  | 'sky'
  | 'mint'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'gold'
  | 'bronze'
  | 'gray'

type GrayColor = 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
}

const defaultContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultContextValue)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps extends PropsWithChildren {
  accentColor?: AccentColor
  grayColor?: GrayColor
}

const ThemeProvider = ({
  children,
  accentColor = 'lime',
  grayColor = 'mauve',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Always check system preference first
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    // Only use saved theme if user has explicitly set one (not just the default)
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    if (savedTheme && savedTheme !== systemTheme) {
      setTheme(savedTheme)
    } else {
      setTheme(systemTheme)
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light'
      const savedTheme = localStorage.getItem('theme') as ThemeMode

      // Only auto-update if user hasn't explicitly set a different preference
      if (!savedTheme || savedTheme === (e.matches ? 'dark' : 'light')) {
        setTheme(newSystemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Update document class for CSS variables
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(theme)

      // Save to localStorage
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <Theme accentColor={accentColor} grayColor={grayColor} appearance={mounted ? theme : 'light'}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
