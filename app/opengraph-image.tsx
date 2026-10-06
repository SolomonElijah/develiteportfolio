import { ImageResponse } from 'next/og'

export const alt = 'Solomon Elijah — Full-Stack Software Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#030712',
        backgroundImage:
          'radial-gradient(circle at 15% 15%, rgba(37, 99, 235, 0.45) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.25) 0%, transparent 55%), radial-gradient(circle at 90% 15%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
        padding: '60px 70px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              backgroundColor: 'rgba(37, 99, 235, 0.25)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 800,
              color: '#38bdf8',
            }}
          >
            se.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#ffffff' }}>
              Solomon Elijah
            </span>
            <span style={{ fontSize: 16, color: '#94a3b8' }}>
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
            padding: '8px 20px',
            fontSize: 16,
            fontWeight: 600,
            color: '#4ade80',
          }}
        >
          <span>●</span>
          <span>Available for hire</span>
        </div>
      </div>

      {/* Center Main Headline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 66,
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
            fontSize: 24,
            color: '#94a3b8',
            lineHeight: 1.45,
            maxWidth: 960,
          }}
        >
          Web applications, mobile apps, and scalable APIs · Based in Lagos,
          Nigeria
        </div>
      </div>

      {/* Bottom Tech Pills & Domain */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: 24,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', gap: 10 }}>
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
                borderRadius: 10,
                padding: '7px 15px',
                fontSize: 15,
                fontWeight: 600,
                color: '#cbd5e1',
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 700,
            color: '#38bdf8',
          }}
        >
          solomonelijah.online ↗
        </div>
      </div>
    </div>,
    size,
  )
}
