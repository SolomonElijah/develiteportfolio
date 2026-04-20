'use client'

import { useState, useRef } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { importContacts } from '@/app/admin/(dashboard)/contacts/actions'
import { toast } from 'sonner'

export default function ImportContactsButton() {
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n')
    if (lines.length < 2) return []

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''))

    const nameIdx = headers.findIndex(h => h === 'name' || h === 'full name' || h === 'fullname')
    const emailIdx = headers.findIndex(h => h === 'email' || h === 'email address')
    const phoneIdx = headers.findIndex(h => h === 'phone' || h === 'phone number' || h === 'tel')
    const messageIdx = headers.findIndex(h => h === 'message' || h === 'note' || h === 'notes')

    if (nameIdx === -1 || emailIdx === -1) {
      throw new Error('CSV must have "name" and "email" columns')
    }

    const contacts: { name: string; email: string; phone?: string; message?: string }[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''))
      
      const name = values[nameIdx]
      const email = values[emailIdx]

      if (!name || !email) continue

      contacts.push({
        name,
        email,
        phone: phoneIdx >= 0 ? values[phoneIdx] : undefined,
        message: messageIdx >= 0 ? values[messageIdx] : undefined,
      })
    }

    return contacts
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file')
      return
    }

    setLoading(true)

    try {
      const text = await file.text()
      const contacts = parseCSV(text)

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
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
      >
        <ArrowUpTrayIcon className="w-5 h-5" />
        {loading ? 'Importing...' : 'Import CSV'}
      </button>
    </>
  )
}