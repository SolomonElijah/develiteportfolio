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
        background: '#f4f6fb',
        padding: '65px 75px',
        color: '#0f172a',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 48, fontWeight: 700 }}>se.</span>
        <span style={{ fontSize: 24 }}>Solomon Elijah</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 78,
            lineHeight: 1.05,
            letterSpacing: '-4px',
          }}
        >
          Software that works beautifully.
        </div>
        <div style={{ display: 'flex', fontSize: 25, color: '#64748b' }}>
          Full-Stack Software Developer · Lagos, Nigeria
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 22, color: '#2563eb' }}>
        WEB · MOBILE · APIs
      </div>
    </div>,
    size,
  )
}
