'use client'

import { useState, useRef } from 'react'
import { ArrowUpTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { importContacts } from '@/app/admin/(dashboard)/contacts/actions'
import { toast } from 'sonner'
import { parseContactCsv } from '@/lib/csv'

export default function ImportContactsButton() {
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!/\.csv$/i.test(file.name)) {
      toast.error('Please upload a CSV file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('CSV files must be under 5 MB.')
      return
    }
    setLoading(true)

    try {
      const text = await file.text()
      const contacts = parseContactCsv(text)

      if (contacts.length === 0) {
        toast.error('No valid contacts found in CSV')
        setLoading(false)
        return
      }

      await importContacts(contacts)
      toast.success(`Imported ${contacts.length} contacts`)
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || 'Failed to import contacts')
    } finally {
      setLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all disabled:opacity-50"
      >
        {loading ? (
          <ArrowPathIcon className="w-4 h-4 animate-spin text-blue-400" />
        ) : (
          <ArrowUpTrayIcon className="w-4 h-4" />
        )}
        <span>{loading ? 'Importing...' : 'Import CSV'}</span>
      </button>
    </>
  )
}
