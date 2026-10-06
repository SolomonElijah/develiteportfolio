import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="container error-page">
      <p className="eyebrow accent">404 / PAGE NOT FOUND</p>
      <h1>A small detour.</h1>
      <p>This page isn’t here. Let’s get you back to the work.</p>
      <Link href="/projects" className="button">
        Explore projects →
      </Link>
    </div>
  )
}
