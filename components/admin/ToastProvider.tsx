'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        className:
          '!bg-slate-900 !text-slate-100 !border !border-slate-800 !rounded-xl !shadow-xl',
      }}
    />
  )
}
