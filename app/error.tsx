'use client'
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container error-page">
      <p className="eyebrow accent">SOMETHING WENT WRONG</p>
      <h1>Let’s try that again.</h1>
      <p>
        The page couldn’t load. Try again, or use the contact link to reach me.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  )
}
