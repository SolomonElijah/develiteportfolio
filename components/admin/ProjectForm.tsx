'use client'

import { useState, useTransition, useId } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  createProject,
  updateProject,
} from '@/app/admin/(dashboard)/projects/actions'
import FileUpload from './FileUpload'
import { toast } from 'sonner'
import {
  generateSlug,
  parseArchitecture,
  type ArchitectureItem,
} from '@/lib/utils'
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  QueueListIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'

interface ProjectFormProps {
  initialData?: any
  isEditing?: boolean
}

const COMMON_TECH_STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Supabase',
  'PostgreSQL',
  'React Native',
  'Laravel',
  'MySQL',
  'GraphQL',
  'Docker',
  'Redis',
  'Figma',
  'REST API',
]

const PRESET_LAYERS = [
  'Frontend',
  'Backend',
  'Database',
  'Storage',
  'Caching',
  'Auth/Admin',
  'API & Integrations',
  'DevOps / Cloud',
  'Security',
]

export default function ProjectForm({
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const fieldPrefix = useId()

  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialData?.slug))
  const [type, setType] = useState<'Web' | 'Mobile' | 'API'>(
    initialData?.type || 'Web',
  )
  const [demoUrl, setDemoUrl] = useState(initialData?.demo_url || '')
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const [featured, setFeatured] = useState<boolean>(
    initialData?.featured || false,
  )
  const [description, setDescription] = useState(initialData?.description || '')
  const [problem, setProblem] = useState(initialData?.problem || '')
  const [solution, setSolution] = useState(initialData?.solution || '')

  // Architecture Layer Builder State
  const [architectureItems, setArchitectureItems] = useState<
    ArchitectureItem[]
  >(() => parseArchitecture(initialData?.architecture))
  const [archMode, setArchMode] = useState<'builder' | 'raw'>('builder')
  const [layerInput, setLayerInput] = useState('Frontend')
  const [detailInput, setDetailInput] = useState('')
  const [rawArchitecture, setRawArchitecture] = useState(
    initialData?.architecture || '',
  )

  // Tech stack & features chips
  const [stack, setStack] = useState<string[]>(initialData?.stack || [])
  const [stackInput, setStackInput] = useState('')
  const [features, setFeatures] = useState<string[]>(
    initialData?.features || [],
  )
  const [featureInput, setFeatureInput] = useState('')

  // Handle title changes & auto-slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    if (!isSlugManual && !isEditing) {
      setSlug(generateSlug(val))
    }
  }

  // Handle Architecture item management
  const addArchitectureItem = () => {
    if (!detailInput.trim()) {
      toast.error('Please enter the implementation details for this layer.')
      return
    }

    const currentLayer = layerInput.trim() || 'Component'
    const newItems = [
      ...architectureItems,
      { layer: currentLayer, detail: detailInput.trim() },
    ]
    setArchitectureItems(newItems)
    setRawArchitecture(
      newItems
        .map((i) => (i.layer ? `${i.layer}: ${i.detail}` : i.detail))
        .join('\n'),
    )
    setDetailInput('')

    // Auto-advance preset layer suggestion to next common layer
    const nextIdx = PRESET_LAYERS.indexOf(currentLayer)
    if (nextIdx >= 0 && nextIdx < PRESET_LAYERS.length - 1) {
      setLayerInput(PRESET_LAYERS[nextIdx + 1])
    }
  }

  const removeArchitectureItem = (index: number) => {
    const updated = architectureItems.filter((_, idx) => idx !== index)
    setArchitectureItems(updated)
    setRawArchitecture(
      updated
        .map((i) => (i.layer ? `${i.layer}: ${i.detail}` : i.detail))
        .join('\n'),
    )
  }

  const moveArchitectureItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === architectureItems.length - 1)
    ) {
      return
    }
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    const copy = [...architectureItems]
    const temp = copy[index]
    copy[index] = copy[targetIdx]
    copy[targetIdx] = temp

    setArchitectureItems(copy)
    setRawArchitecture(
      copy
        .map((i) => (i.layer ? `${i.layer}: ${i.detail}` : i.detail))
        .join('\n'),
    )
  }

  const loadBlueprintTemplate = () => {
    const blueprint: ArchitectureItem[] = [
      {
        layer: 'Frontend',
        detail: 'Component-based UI (SSR + client hydration)',
      },
      {
        layer: 'Backend',
        detail: 'REST API handling business logic and request flows',
      },
      {
        layer: 'Storage',
        detail: 'Cloud-based media storage (e.g., S3/R2)',
      },
      {
        layer: 'Caching',
        detail: 'API caching + ETag system for performance',
      },
      {
        layer: 'Auth/Admin',
        detail: 'Role-based access control for managing resources',
      },
    ]
    setArchitectureItems(blueprint)
    setRawArchitecture(
      blueprint.map((i) => `${i.layer}: ${i.detail}`).join('\n'),
    )
    toast.success('Architecture blueprint loaded')
  }

  // Handle stack
  const addStackItem = (itemToAdd?: string) => {
    const candidate = (itemToAdd || stackInput).trim()
    if (candidate && !stack.includes(candidate)) {
      setStack([...stack, candidate])
      setStackInput('')
    }
  }

  const removeStackItem = (idxToRemove: number) => {
    setStack(stack.filter((_, idx) => idx !== idxToRemove))
  }

  // Handle features
  const addFeatureItem = () => {
    const candidate = featureInput.trim()
    if (candidate && !features.includes(candidate)) {
      setFeatures([...features, candidate])
      setFeatureInput('')
    }
  }

  const removeFeatureItem = (idxToRemove: number) => {
    setFeatures(features.filter((_, idx) => idx !== idxToRemove))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('Project title is required.')
      return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.set('title', title.trim())
    formData.set('slug', slug.trim() || generateSlug(title.trim()))
    formData.set('type', type)
    formData.set('description', description.trim())
    formData.set('problem', problem.trim())
    formData.set('solution', solution.trim())

    // Serialize architecture from structured items or raw text
    const finalArchitecture =
      archMode === 'raw'
        ? rawArchitecture.trim()
        : architectureItems
            .map((i) =>
              i.layer
                ? `${i.layer.trim()}: ${i.detail.trim()}`
                : i.detail.trim(),
            )
            .join('\n')

    formData.set('architecture', finalArchitecture)
    formData.set('imageUrl', imageUrl.trim())
    formData.set('demoUrl', demoUrl.trim())
    formData.set('stack', JSON.stringify(stack))
    formData.set('features', JSON.stringify(features))
    formData.set('featured', featured ? 'true' : 'false')

    try {
      if (isEditing) {
        await updateProject(initialData.id, formData)
        toast.success('Project updated successfully.')
      } else {
        await createProject(formData)
        toast.success('Project created successfully.')
      }

      startTransition(() => {
        router.push('/admin/projects')
        router.refresh()
      })
    } catch (err: unknown) {
      setSubmitting(false)
      toast.error(
        err instanceof Error ? err.message : 'Failed to save the project.',
      )
    }
  }

  const isLoading = submitting || isPending

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* 1. Project Essentials */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="border-b border-slate-800/80 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              General Information
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Specify key metadata, platform type, and live demo links.
            </p>
          </div>
          {isEditing && (
            <Link
              href={`/projects/${initialData.slug}`}
              target="_blank"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all"
            >
              <span>View live</span>
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-1.5 md:col-span-2">
            <label
              htmlFor={`${fieldPrefix}-field-0`}
              className="block text-sm font-medium text-slate-200"
            >
              Project Title <span className="text-rose-400">*</span>
            </label>
            <input
              id={`${fieldPrefix}-field-0`}
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. United Airways – Flight Booking Platform"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${fieldPrefix}-field-1`}
                className="text-sm font-medium text-slate-200"
              >
                URL Slug <span className="text-rose-400">*</span>
              </label>
              {!isSlugManual && (
                <span className="text-xs text-slate-500">Auto-generated</span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">
                /projects/
              </span>
              <input
                id={`${fieldPrefix}-field-1`}
                type="text"
                value={slug}
                onChange={(e) => {
                  setIsSlugManual(true)
                  setSlug(e.target.value)
                }}
                placeholder="project-slug"
                required
                className="w-full pl-20 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-1.5">
            <p className="block text-sm font-medium text-slate-200">
              Platform Type
            </p>
            <div
              role="group"
              aria-label="Platform Type"
              className="grid grid-cols-3 gap-2"
            >
              {[
                { id: 'Web', label: 'Web App', icon: GlobeAltIcon },
                {
                  id: 'Mobile',
                  label: 'Mobile App',
                  icon: DevicePhoneMobileIcon,
                },
                { id: 'API', label: 'API / Backend', icon: ServerStackIcon },
              ].map((item) => {
                const Icon = item.icon
                const isSelected = type === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setType(item.id as any)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm shadow-blue-500/10'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Demo URL */}
          <div className="space-y-1.5">
            <label
              htmlFor={`${fieldPrefix}-field-3`}
              className="block text-sm font-medium text-slate-200"
            >
              Live Demo / External Link
            </label>
            <input
              id={`${fieldPrefix}-field-3`}
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          {/* Featured Project Switch */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <label
              aria-label="Feature on Homepage"
              htmlFor={`${fieldPrefix}-field-4`}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/80 bg-slate-950/60 cursor-pointer hover:border-slate-600 transition-all"
            >
              <input
                id={`${fieldPrefix}-field-4`}
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-900"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-white">
                    Feature on Homepage
                  </span>
                  <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-xs text-slate-400">
                  Highlight this project on your main portfolio showcase.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* 2. Media & Visual Assets */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-4">
        <div className="border-b border-slate-800/80 pb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Media & Visual Showcase
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload high-resolution screenshots or paste direct cloud storage
            URLs.
          </p>
        </div>

        <FileUpload
          bucket="projects"
          onUploadComplete={setImageUrl}
          existingUrl={imageUrl}
          label="Project Cover / Screenshot"
        />
      </div>

      {/* 3. Narrative & Case Study Content */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="border-b border-slate-800/80 pb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Case Study Narrative
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explain the challenge, your technical decisions, and architecture.
          </p>
        </div>

        <div className="space-y-6">
          {/* Brief Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${fieldPrefix}-field-5`}
                className="block text-sm font-medium text-slate-200"
              >
                Short Summary <span className="text-rose-400">*</span>
              </label>
              <span className="text-xs text-slate-500">
                {description.length} / 1500 chars
              </span>
            </div>
            <textarea
              id={`${fieldPrefix}-field-5`}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief overview of the project shown on listing cards..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem */}
            <div className="space-y-1.5">
              <label
                htmlFor={`${fieldPrefix}-field-6`}
                className="block text-sm font-medium text-slate-200"
              >
                The Problem / Challenge
              </label>
              <textarea
                id={`${fieldPrefix}-field-6`}
                rows={5}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What user pain points or technical hurdles existed before this project?"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
              />
            </div>

            {/* The Solution */}
            <div className="space-y-1.5">
              <label
                htmlFor={`${fieldPrefix}-field-7`}
                className="block text-sm font-medium text-slate-200"
              >
                The Solution / Approach
              </label>
              <textarea
                id={`${fieldPrefix}-field-7`}
                rows={5}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How did your solution solve these problems? What core workflows were implemented?"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Architecture Layer Builder (Add them one after the other) */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="block text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Architecture & Technical Implementation (
                  {architectureItems.length} layers)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Define technical implementation layers one by one (e.g.
                  Frontend, Backend, Storage, Caching, Auth).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadBlueprintTemplate}
                  className="px-2.5 py-1 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition-all flex items-center gap-1"
                >
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>Load Template</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (archMode === 'builder') {
                      // Sync to raw text
                      setRawArchitecture(
                        architectureItems
                          .map((i) =>
                            i.layer ? `${i.layer}: ${i.detail}` : i.detail,
                          )
                          .join('\n'),
                      )
                      setArchMode('raw')
                    } else {
                      // Parse raw text back to items
                      setArchitectureItems(parseArchitecture(rawArchitecture))
                      setArchMode('builder')
                    }
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-900 rounded-lg border border-slate-800 transition-all flex items-center gap-1"
                >
                  {archMode === 'builder' ? (
                    <>
                      <CodeBracketIcon className="w-3.5 h-3.5" />
                      <span>Raw Text</span>
                    </>
                  ) : (
                    <>
                      <QueueListIcon className="w-3.5 h-3.5" />
                      <span>Layer Builder</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {archMode === 'builder' ? (
              <div className="space-y-4">
                {/* Layer Entry Box */}
                <div className="p-4 rounded-xl border border-slate-700/80 bg-slate-950/70 space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-400">
                      Quick Layer Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_LAYERS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setLayerInput(preset)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            layerInput.toLowerCase() === preset.toLowerCase()
                              ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label
                        htmlFor={`${fieldPrefix}-field-9`}
                        className="text-xs font-medium text-slate-400"
                      >
                        Layer / Component
                      </label>
                      <input
                        id={`${fieldPrefix}-field-9`}
                        type="text"
                        value={layerInput}
                        onChange={(e) => setLayerInput(e.target.value)}
                        placeholder="e.g. Frontend"
                        className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label
                        htmlFor={`${fieldPrefix}-field-10`}
                        className="text-xs font-medium text-slate-400"
                      >
                        Implementation Details
                      </label>
                      <div className="flex gap-2">
                        <input
                          id={`${fieldPrefix}-field-10`}
                          type="text"
                          value={detailInput}
                          onChange={(e) => setDetailInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addArchitectureItem()
                            }
                          }}
                          placeholder="e.g. Component-based UI (SSR + client hydration)"
                          className="flex-1 px-3.5 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={addArchitectureItem}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                        >
                          <PlusIcon className="w-4 h-4" />
                          <span>Add Layer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer Items Display */}
                {architectureItems.length > 0 ? (
                  <div className="space-y-2">
                    {architectureItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 group transition-all"
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                          <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-400 text-xs flex items-center justify-center font-mono shrink-0 mt-0.5 sm:mt-0">
                            {idx + 1}
                          </span>

                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 min-w-0 flex-1">
                            {item.layer && (
                              <span className="inline-flex px-2 py-0.5 text-xs font-mono font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/25 rounded-md shrink-0">
                                {item.layer}:
                              </span>
                            )}
                            <span className="text-sm text-slate-300 leading-relaxed break-words flex-1">
                              {item.detail}
                            </span>
                          </div>
                        </div>

                        {/* Order & Remove Actions */}
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={() => moveArchitectureItem(idx, 'up')}
                            disabled={idx === 0}
                            title="Move layer up"
                            className="p-1 text-slate-500 hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                          >
                            <ChevronUpIcon className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveArchitectureItem(idx, 'down')}
                            disabled={idx === architectureItems.length - 1}
                            title="Move layer down"
                            className="p-1 text-slate-500 hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                          >
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeArchitectureItem(idx)}
                            title="Remove layer"
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors ml-1"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
                    No architecture layers added yet. Use the presets above or
                    load a template.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  rows={6}
                  aria-label="Architecture as text"
                  value={rawArchitecture}
                  onChange={(e) => {
                    setRawArchitecture(e.target.value)
                    setArchitectureItems(parseArchitecture(e.target.value))
                  }}
                  placeholder="Frontend: Component-based UI (SSR + client hydration)&#10;Backend: REST API handling cars, loans, and user actions&#10;Storage: Cloud-based media storage (e.g., R2/S3)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-xs leading-relaxed"
                />
                <p className="text-xs text-slate-500">
                  Enter one layer per line in &quot;Layer: Description&quot;
                  format.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Tech Stack & Features */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="border-b border-slate-800/80 pb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            Technologies & Key Features
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tag all tools and list highlight features.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3">
          <label
            htmlFor={`${fieldPrefix}-field-11`}
            className="block text-sm font-medium text-slate-200"
          >
            Tech Stack Tags ({stack.length})
          </label>
          <div className="flex gap-2">
            <input
              id={`${fieldPrefix}-field-11`}
              type="text"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault()
                  addStackItem()
                }
              }}
              placeholder="Type tech name and press Enter (e.g. Next.js, Docker)"
              className="flex-1 px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
            <button
              type="button"
              onClick={() => addStackItem()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <PlusIcon className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="space-y-1.5 pt-1">
            <span className="text-xs text-slate-500">Popular suggestions:</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TECH_STACK.map((item) => {
                const isAlready = stack.includes(item)
                return (
                  <button
                    key={item}
                    type="button"
                    disabled={isAlready}
                    onClick={() => addStackItem(item)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      isAlready
                        ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-default'
                        : 'bg-slate-950 hover:bg-blue-600/10 border-slate-800 hover:border-blue-500/40 text-slate-400 hover:text-blue-300'
                    }`}
                  >
                    + {item}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Tags */}
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {stack.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-medium"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeStackItem(idx)}
                    className="hover:text-rose-400 transition-colors p-0.5"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <label
            htmlFor={`${fieldPrefix}-field-12`}
            className="block text-sm font-medium text-slate-200"
          >
            Key Features ({features.length})
          </label>
          <div className="flex gap-2">
            <input
              id={`${fieldPrefix}-field-12`}
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addFeatureItem()
                }
              }}
              placeholder="e.g. Real-time WebSocket live tracking and push alerts"
              className="flex-1 px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
            <button
              type="button"
              onClick={addFeatureItem}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <PlusIcon className="w-4 h-4" />
              Add
            </button>
          </div>

          {features.length > 0 && (
            <div className="space-y-2 pt-2">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-sm text-slate-300 group hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span>{feat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeatureItem(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              <span>Saving Project...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Publish Project'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-sm font-medium transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
