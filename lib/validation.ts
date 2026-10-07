import imageSources from './image-sources.json'

export function text(
  value: unknown,
  label: string,
  max = 5000,
  required = true,
): string {
  if (typeof value !== 'string') throw new Error(`${label} must be text.`)
  const result = value.trim()
  if ((required && !result) || result.length > max)
    throw new Error(`${label} is required and must be under ${max} characters.`)
  return result
}
export function email(value: unknown): string {
  const result = text(value, 'Email', 254).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result) || /[\r\n]/.test(result))
    throw new Error('Enter a valid email address.')
  return result
}
export function safeExternalUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value) return undefined
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' && !url.username && !url.password)
      return url.href
  } catch {
    /* Invalid URL */
  }
  return undefined
}
export function safeImageUrl(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (
      /^\/images\/[a-zA-Z0-9_./-]+$/.test(trimmed) &&
      !trimmed.split('/').some((segment) => segment === '.' || segment === '..')
    ) {
      return trimmed
    }
    const url = safeExternalUrl(trimmed)
    if (url) {
      const parsed = new URL(url)
      const sources = [...imageSources]
      try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL)
          sources.push({
            hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
            pathname: '/storage/v1/object/public/**',
          })
      } catch {
        /* Invalid configuration is not an approved image source. */
      }
      if (
        !parsed.port &&
        sources.some(
          (source) =>
            parsed.hostname === source.hostname &&
            parsed.pathname.startsWith(source.pathname.slice(0, -2)),
        )
      )
        return url
    }
  }
  return undefined
}
export function safeImage(value: unknown): string {
  return safeImageUrl(value) || '/images/project1.png'
}
export function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? Array.from(
        new Set(
          value
            .filter(
              (item): item is string =>
                typeof item === 'string' && !!item.trim(),
            )
            .map((item) => item.trim()),
        ),
      )
    : []
}
export function formArray(
  value: FormDataEntryValue | null,
  label: string,
): string[] {
  try {
    const parsed: unknown = JSON.parse(String(value))
    if (
      !Array.isArray(parsed) ||
      parsed.length > 50 ||
      parsed.some((item) => typeof item !== 'string' || item.length > 500)
    )
      throw new Error()
    return stringArray(parsed)
  } catch {
    throw new Error(`${label} must be a list of text values.`)
  }
}
export function optionalUrl(
  value: FormDataEntryValue | null,
  label: string,
  image = false,
) {
  if (!value || typeof value !== 'string' || !value.trim()) return null
  const trimmed = value.trim()
  const url = image ? safeImageUrl(trimmed) : safeExternalUrl(trimmed)
  if (!url)
    throw new Error(
      image
        ? `${label} must use a local image, public Supabase storage, or images.unsplash.com over HTTPS.`
        : `${label} must be a valid HTTPS URL.`,
    )
  return url
}
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  )
}
