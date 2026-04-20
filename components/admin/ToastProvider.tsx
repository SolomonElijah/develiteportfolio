'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'dark:bg-navy-card dark:text-white',
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
        },
      }}
    />
  )
}
