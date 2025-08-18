'use client'

import React, { PropsWithChildren } from 'react'

import { Toaster } from 'react-hot-toast'

interface ToastProviderProps extends PropsWithChildren {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  duration?: number
}

const ToastProvider = ({ 
  children, 
  position = 'top-right',
  duration = 4000
}: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster 
        position={position}
        toastOptions={{
          duration,
          style: {
            background: 'var(--color-panel)',
            color: 'var(--color-foreground)',
            border: '1px solid var(--gray-6)',
          },
        }}
      />
    </>
  )
}

export default ToastProvider
