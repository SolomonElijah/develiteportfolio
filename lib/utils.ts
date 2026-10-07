import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .slice(0, 180)
    .replace(/^-+|-+$/g, '')
}

export interface ArchitectureItem {
  layer: string
  detail: string
}

export function parseArchitecture(raw?: string): ArchitectureItem[] {
  if (!raw || !raw.trim()) return []
  const text = raw.trim()

  // First try splitting by newlines
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  if (lines.length > 1) {
    return lines.map((line) => {
      const colonIdx = line.indexOf(':')
      if (colonIdx > 0) {
        return {
          layer: line.slice(0, colonIdx).trim(),
          detail: line.slice(colonIdx + 1).trim(),
        }
      }
      return { layer: '', detail: line }
    })
  }

  // Handle single-line concatenated strings like:
  // "Frontend: Component-based UI ... Backend: REST API ... Storage: Cloud ..."
  // Newlines support arbitrary layer names. In legacy concatenated text, only
  // known labels are unambiguous; do not consume words from preceding details.
  const regex =
    /(?:^|\s+)(Frontend|Backend|Database|Storage|Caching|Auth\/Admin|Auth|API & Integrations|DevOps \/ Cloud|Security):\s*/gi
  const matches: ArchitectureItem[] = []
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    const start = regex.lastIndex
    const next = regex.exec(text)
    const end = next ? next.index : text.length
    matches.push({ layer: m[1].trim(), detail: text.slice(start, end).trim() })
    regex.lastIndex = end
  }
  if (matches.length > 0) return matches

  const colonIdx = text.indexOf(':')
  if (colonIdx > 0) {
    return [
      {
        layer: text.slice(0, colonIdx).trim(),
        detail: text.slice(colonIdx + 1).trim(),
      },
    ]
  }
  return [{ layer: '', detail: text }]
}
