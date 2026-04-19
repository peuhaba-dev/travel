'use client'

// ── AdSenseScript — inject once in <head> ────────────────────────────────────
export default function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  if (!clientId) return null

  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  )
}
