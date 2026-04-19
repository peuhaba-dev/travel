'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
  label?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdBanner({
  slot,
  format = 'auto',
  className = '',
  label = 'Iklan',
}: AdBannerProps) {
  const adRef  = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        pushed.current = true
      }
    } catch {
      // AdSense not loaded — graceful degradation
    }
  }, [])

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: 50, maxHeight: 90 }}
    >
      {/* Label */}
      <p className="absolute top-1 left-2 text-[10px] text-gray-400 font-body uppercase tracking-wider z-10">
        {label}
      </p>

      {clientId ? (
        <ins
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        /* Placeholder when AdSense not configured */
        <div className="w-full h-[90px] bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <span className="text-xs text-gray-400 font-body">Google AdSense — Slot {slot}</span>
        </div>
      )}
    </div>
  )
}
