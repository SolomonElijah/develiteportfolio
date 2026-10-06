import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, createAdminClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/authorization'
import { sameOrigin, allowRequest } from '@/lib/http'
export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!isAdmin(user))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!sameOrigin(request))
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  if (!allowRequest(`upload:${user!.id}`, 30))
    return NextResponse.json(
      { error: 'Too many uploads. Try again later.' },
      { status: 429 },
    )
  try {
    const limit = 10 * 1024 * 1024 + 32768 // 10 MB max
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > limit)
      throw new Error('Image exceeds 10 MB limit.')

    const formData = await request.formData()
    const file = formData.get('file'),
      bucket = formData.get('bucket')

    if (
      !(file instanceof File) ||
      !['projects', 'blog'].includes(String(bucket))
    )
      throw new Error('Please choose a valid file and destination bucket.')

    if (file.size > 10 * 1024 * 1024 || !file.size)
      throw new Error('Image must be under 10 MB.')

    const content = Buffer.from(await file.arrayBuffer())

    // Format detection
    const isPng =
      content.length >= 8 &&
      content
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    const isJpeg =
      content.length >= 3 &&
      content[0] === 255 &&
      content[1] === 216 &&
      content[2] === 255
    const isWebp =
      content.length >= 12 &&
      content.toString('ascii', 0, 4) === 'RIFF' &&
      content.toString('ascii', 8, 12) === 'WEBP'
    const isGif =
      content.length >= 6 && content.toString('ascii', 0, 3) === 'GIF'
    const isSvg =
      file.type.toLowerCase().includes('svg') &&
      (content.toString('utf8', 0, 200).includes('<svg') ||
        content.toString('utf8', 0, 200).includes('<?xml'))

    let ext = 'jpg'
    let mime = 'image/jpeg'

    if (isPng) {
      ext = 'png'
      mime = 'image/png'
    } else if (isJpeg) {
      ext = 'jpg'
      mime = 'image/jpeg'
    } else if (isWebp) {
      ext = 'webp'
      mime = 'image/webp'
    } else if (isGif) {
      ext = 'gif'
      mime = 'image/gif'
    } else if (isSvg) {
      ext = 'svg'
      mime = 'image/svg+xml'
    } else {
      throw new Error(
        'Supported formats: JPEG, PNG, WebP, GIF, or SVG.',
      )
    }

    const cleanBaseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40)
    const name = `${Date.now()}-${cleanBaseName || crypto.randomUUID()}.${ext}`

    const db = await createAdminClient()
    const { error } = await db.storage
      .from(String(bucket))
      .upload(name, content, { contentType: mime, upsert: true })

    if (error) {
      console.error('Storage upload error:', error)
      return NextResponse.json(
        {
          error:
            error.message ||
            'The image could not be saved to Supabase storage.',
        },
        { status: 502 },
      )
    }

    const publicUrl = db.storage
      .from(String(bucket))
      .getPublicUrl(name).data.publicUrl

    return NextResponse.json(
      {
        url: publicUrl,
        name,
        size: file.size,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed.' },
      { status: 400 },
    )
  }
}
