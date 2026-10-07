'use client'

import { useState, useRef, DragEvent } from 'react'
import Image from 'next/image'
import { safeImageUrl } from '@/lib/validation'
import {
  CloudArrowUpIcon,
  LinkIcon,
  TrashIcon,
  PhotoIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'

interface Props {
  bucket: 'projects' | 'blog'
  onUploadComplete: (url: string) => void
  existingUrl?: string
  label?: string
}

export default function FileUpload({
  bucket,
  onUploadComplete,
  existingUrl = '',
  label = 'Featured Image',
}: Props) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(existingUrl)
  const [urlInput, setUrlInput] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileProcess = async (file: File) => {
    if (!file) return
    setError('')

    const allowedMime = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'image/jpg',
    ]

    const isExtensionValid = /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name)
    if (!allowedMime.includes(file.type.toLowerCase()) && !isExtensionValid) {
      setError(
        'Please choose a valid image file (JPEG, PNG, WebP, GIF, or SVG).',
      )
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10 MB limit.')
      return
    }

    setUploading(true)
    try {
      const data = new FormData()
      data.set('file', file)
      data.set('bucket', bucket)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
        signal: AbortSignal.timeout(60000),
      })

      const result = await response.json()
      if (!response.ok || !result.url) {
        throw new Error(result.error || 'Upload failed. Please try again.')
      }

      setPreview(result.url)
      onUploadComplete(result.url)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to upload image. Please check your connection.',
      )
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (uploading) return
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileProcess(file)
  }

  const handleUrlApply = () => {
    if (!urlInput.trim()) return
    setError('')
    try {
      const url = safeImageUrl(urlInput.trim())
      if (!url) throw new Error('Unsupported image URL.')
      setPreview(url)
      onUploadComplete(url)
      setUrlInput('')
    } catch {
      setError(
        'Use a local image, public Supabase storage, or images.unsplash.com over HTTPS.',
      )
    }
  }

  const handleClear = () => {
    setPreview('')
    setError('')
    onUploadComplete('')
  }

  const handleCopyUrl = async () => {
    if (!preview) return
    await navigator.clipboard.writeText(preview)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {preview && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <ClipboardDocumentCheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
            >
              <TrashIcon className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        )}
      </div>

      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/60 shadow-lg transition-all hover:border-blue-500/50">
          <div className="relative w-full aspect-video sm:aspect-[21/9] max-h-72 bg-slate-950 flex items-center justify-center">
            <Image
              src={preview}
              alt="Project media preview"
              fill
              className="object-contain sm:object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              unoptimized={preview.startsWith('http')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
              <span className="text-xs text-slate-300 truncate max-w-[80%] font-mono bg-slate-900/80 px-2 py-1 rounded backdrop-blur-sm border border-slate-700/50">
                {preview}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <ArrowPathIcon className="w-3.5 h-3.5" />
                Replace
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Tabs: Upload File vs Direct URL */}
          <div className="flex p-1 bg-slate-900/80 border border-slate-800 rounded-lg max-w-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('upload')
                setError('')
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'upload'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudArrowUpIcon className="w-4 h-4" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('url')
                setError('')
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'url'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Image URL
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div
              role="button"
              tabIndex={uploading ? -1 : 0}
              aria-label="Upload an image"
              aria-disabled={uploading}
              onKeyDown={(event) => {
                if (
                  !uploading &&
                  (event.key === 'Enter' || event.key === ' ')
                ) {
                  event.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`cursor-pointer relative border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all ${
                dragOver
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700/80 hover:border-blue-500/50 bg-slate-900/40 hover:bg-slate-900/70'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
                {uploading ? (
                  <ArrowPathIcon className="w-6 h-6 animate-spin text-blue-400" />
                ) : (
                  <CloudArrowUpIcon className="w-6 h-6" />
                )}
              </div>
              <p className="text-sm font-medium text-slate-200">
                {uploading
                  ? 'Uploading to cloud...'
                  : 'Click to upload or drag & drop'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, WebP, GIF or SVG up to 10 MB
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-slate-700/80 bg-slate-900/50 space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    aria-label={`${label} URL`}
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleUrlApply()
                      }
                    }}
                    placeholder="https://images.unsplash.com/photo-example"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <PhotoIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
                <button
                  type="button"
                  onClick={handleUrlApply}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Apply
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Use a local image path, public Supabase storage, or an HTTPS
                image from images.unsplash.com.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input for file selection */}
      <input
        ref={fileInputRef}
        aria-label={`${label} file`}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileProcess(file)
        }}
        className="hidden"
      />

      {error && (
        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
