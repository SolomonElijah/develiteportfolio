import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'Solomon Elijah — Full-Stack Software Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  // Load optimized portrait image
  let portraitDataUri: string | null = null
  try {
    const imagePath = path.join(process.cwd(), 'public/images/me-og.jpg')
    if (fs.existsSync(imagePath)) {
      const buffer = fs.readFileSync(imagePath)
      portraitDataUri = `data:image/jpeg;base64,${buffer.toString('base64')}`
    }
  } catch {
    portraitDataUri = null
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#030712',
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(37, 99, 235, 0.45) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.25) 0%, transparent 55%), radial-gradient(circle at 90% 15%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)',
          padding: '50px 65px',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          border: '14px solid rgba(255, 255, 255, 0.05)',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: 'rgba(37, 99, 235, 0.3)',
                border: '1px solid rgba(56, 189, 248, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 800,
                color: '#38bdf8',
              }}
            >
              se.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#ffffff' }}>
                Solomon Elijah
              </span>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>
                Full-Stack Software Developer
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: 9999,
              padding: '6px 18px',
              fontSize: 15,
              fontWeight: 600,
              color: '#4ade80',
            }}
          >
            <span>●</span>
            <span>Available for hire</span>
          </div>
        </div>

        {/* Center Main Section: Headline & Portrait Photo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            width: '100%',
          }}
        >
          {/* Left Text Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              flex: 1,
              maxWidth: 720,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 54,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-2px',
                color: '#ffffff',
              }}
            >
              I build software that solves real problems.
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 20,
                color: '#94a3b8',
                lineHeight: 1.45,
              }}
            >
              Web applications, mobile apps, and scalable APIs. From intuitive
              interfaces to dependable backend systems.
            </div>

            {/* Tech badges */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                marginTop: 8,
              }}
            >
              {[
                'React',
                'Next.js',
                'TypeScript',
                'React Native',
                'Laravel',
                'REST APIs',
              ].map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: 'flex',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 8,
                    padding: '5px 12px',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#cbd5e1',
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Right Portrait Column */}
          {portraitDataUri && (
            <div
              style={{
                display: 'flex',
                position: 'relative',
                width: 250,
                height: 250,
                borderRadius: 28,
                overflow: 'hidden',
                border: '3px solid rgba(56, 189, 248, 0.6)',
                boxShadow: '0 0 40px rgba(37, 99, 235, 0.45)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portraitDataUri}
                alt="Solomon Elijah"
                width={250}
                height={250}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>

        {/* Bottom Bar: Location & Clean Vercel Domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 18,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 16,
              color: '#94a3b8',
            }}
          >
            📍 Lagos, Nigeria · Full-Stack Software Developer
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: '#38bdf8',
            }}
          >
            solomonelijah.vercel.app ↗
          </div>
        </div>
      </div>
    ),
    size,
  )
}
