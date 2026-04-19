'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CITIES } from '@/types'

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    const match = CITIES.find(c =>
      c.name.toLowerCase().includes(query.toLowerCase())
    )
    if (match) router.push(`/city/${match.slug}`)
  }

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* Background video/image layer */}
      <div className="absolute inset-0 z-0">
        {/* Deep forest green base */}
        <div className="absolute inset-0 bg-gradient-to-br from-aceh-dark via-aceh-green to-[#0a3d2e]" />
        {/* Batik pattern overlay */}
        <div className="absolute inset-0 bg-batik-pattern opacity-10" />
        {/* Diagonal light sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-aceh-cream to-transparent" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full border border-aceh-gold/10 z-0" />
      <div className="absolute top-32 right-20 w-48 h-48 rounded-full border border-aceh-gold/10 z-0" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-aceh-teal/10 blur-3xl z-0" />
      <div className="absolute top-40 left-1/2 w-96 h-96 rounded-full bg-aceh-gold/5 blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-aceh-gold/10 border border-aceh-gold/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-aceh-gold animate-pulse" />
            <span className="font-body text-aceh-amber text-xs font-semibold tracking-widest uppercase">
              Panduan Wisata Aceh Terlengkap
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Jelajahi Keindahan{' '}
            <span className="text-aceh-gold">Tanah Rencong</span>
          </h1>

          {/* Sub */}
          <p className="font-body text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            Dari Sabang hingga Subulussalam — temukan wisata, kuliner, penginapan,
            dan pengalaman tak terlupakan di seluruh pelosok Aceh.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari kota atau destinasi..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white font-body text-gray-800 
                           placeholder-gray-400 shadow-xl focus:outline-none focus:ring-2 
                           focus:ring-aceh-gold text-base"
              />
            </div>
            <button type="submit" className="btn-gold px-6 py-4 rounded-2xl text-base shadow-xl">
              Cari
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['Sabang', 'Banda Aceh', 'Kopi Gayo', 'Danau Laut Tawar', 'Arung Jeram'].map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="font-body text-xs text-white/60 border border-white/20 rounded-full 
                           px-3 py-1.5 hover:border-aceh-gold/60 hover:text-aceh-amber transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap gap-8">
          {[
            { value: '23', label: 'Kabupaten/Kota' },
            { value: '200+', label: 'Destinasi Wisata' },
            { value: '50+', label: 'Kuliner Khas' },
            { value: '100+', label: 'Penginapan' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="font-display font-bold text-2xl text-aceh-gold">{value}</span>
              <span className="font-body text-sm text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
        <span className="font-body text-white/40 text-xs tracking-widest uppercase">Gulir</span>
        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
