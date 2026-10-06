import { email, text, formArray, optionalUrl } from './validation'
import { generateSlug } from './utils'
export function projectInput(form: FormData) {
  const title = text(form.get('title'), 'Title', 160),
    type = text(form.get('type'), 'Project type', 10)
  if (!['Web', 'Mobile', 'API'].includes(type))
    throw new Error('Choose a valid project type.')
  const customSlug = form.get('slug')
  const slug =
    typeof customSlug === 'string' && customSlug.trim()
      ? generateSlug(customSlug.trim())
      : generateSlug(title)
  if (!slug) throw new Error('Title or slug must contain letters or numbers.')
  const imageUrlRaw = form.get('imageUrl') ?? form.get('image_url')
  const demoUrlRaw = form.get('demoUrl') ?? form.get('demo_url')
  return {
    title,
    slug,
    type,
    description: text(form.get('description'), 'Description', 1500),
    problem: text(form.get('problem') || '', 'Problem', 10000, false),
    solution: text(form.get('solution') || '', 'Solution', 10000, false),
    architecture: text(
      form.get('architecture') || '',
      'Architecture',
      10000,
      false,
    ),
    image_url: optionalUrl(imageUrlRaw, 'Image', true),
    demo_url: optionalUrl(demoUrlRaw, 'Demo'),
    stack: formArray(form.get('stack'), 'Stack'),
    features: formArray(form.get('features'), 'Features'),
    featured: form.get('featured') === 'true',
  }
}
export function blogInput(form: FormData) {
  const title = text(form.get('title'), 'Title', 160),
    slug = generateSlug(title)
  if (!slug) throw new Error('Title must contain letters or numbers.')
  return {
    title,
    slug,
    content: text(form.get('content'), 'Content', 100000),
    excerpt: text(form.get('excerpt'), 'Excerpt', 1000),
    thumbnail_url: optionalUrl(form.get('thumbnailUrl'), 'Thumbnail', true),
    published: form.get('published') === 'true',
  }
}
export function clientInput(form: FormData) {
  const status = form.get('status')
  if (!['ongoing', 'completed'].includes(String(status)))
    throw new Error('Choose a valid client status.')
  const expenditure = Number(form.get('expenditure') || 0),
    revenue = Number(form.get('revenue') || 0)
  if (
    ![expenditure, revenue].every(
      (value) => Number.isFinite(value) && value >= 0,
    )
  )
    throw new Error('Financial values must be positive numbers or zero.')
  return {
    customer_name: text(form.get('customerName'), 'Customer name', 150),
    email: form.get('email') ? email(form.get('email')) : '',
    phone: text(form.get('phone') || '', 'Phone', 40, false),
    project_title: text(form.get('projectTitle'), 'Project title', 160),
    description: text(
      form.get('description') || '',
      'Description',
      10000,
      false,
    ),
    expenditure,
    revenue,
    status,
  }
}
export function recordId(id: unknown): asserts id is string {
  if (
    typeof id !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  )
    throw new Error('Invalid record ID.')
}
