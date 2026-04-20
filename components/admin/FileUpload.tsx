'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PhotoIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface FileUploadProps {
  bucket: 'projects' | 'blog'
  onUploadComplete: (url: string) => void
  existingUrl?: string
}

export default function FileUpload({
  bucket,
  onUploadComplete,
  existingUrl,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(existingUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    setUploading(true)
    const supabase = createClient()

    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) {
      console.error('Upload error:', error)
      setUploading(false)
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName)

    onUploadComplete(publicUrl)
    setUploading(false)
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-full h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer overflow-hidden"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <PhotoIcon className="w-12 h-12 mb-2" />
            <span className="text-sm">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
