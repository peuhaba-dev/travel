'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CITIES, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types'
import type { TravelPlace, PlaceCategory } from '@/types'
import PlaceCard      from '@/components/PlaceCard'
import CategoryFilter from '@/components/CategoryFilter'
import AdBanner       from '@/components/AdBanner'
import { PlaceCardSkeleton } from '@/components/Skeleton'

type Props = { params: Promise<{ cityName: string }> }

type Tab = PlaceCategory | 'semua'

export default function CityPage({ params }: Props) {
  const { cityName } = use(params)

  const city = CITIES.find(c => c.slug === cityName)

  const [places, setPlaces]   = useState<TravelPlace[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('semua')
  const [search, setSearch]   = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`/api/places?city=${cityName}`)
      .then(r => r.json())
      .then(data => { setPlaces(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [cityName])

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl mb-4">🗺️</p>
          <h1 className="font-display text-2xl text-aceh-green mb-2">Kota tidak ditemukan</h1>
          <p className="font-body text-gray-500 mb-6">
            Kota <strong>{cityName}</strong> belum terdaftar di direktori kami.
          </p>
          <Link href="/" className="btn-primary">← Kembali ke Beranda</Link>
        </div>
      </div>
    )
  }

  // Filter & search
  const filtered = places.filter(p => {
    const matchTab    = activeTab === 'semua' || p.category === activeTab
    const matchSearch = !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  // Count per category
  const counts: Partial<Record<Tab, number>> = { semua: places.length }
  for (const p of places) {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }

  return (
    <div className="pt-16 md:pt-20">

      {/* ── Hero ────────────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image
          src={city.image}
          alt={city.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-batik-pattern opacity-10" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-xs font-body mb-4">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-aceh-amber">Kota</span>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </nav>

          <p className="font-body text-aceh-amber text-xs uppercase tracking-widest mb-2">
            {city.province} — Aceh
          </p>
          <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-3">
            {city.name}
          </h1>
          <p className="font-body text-white/70 text-base max-w-xl">{city.description}</p>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-aceh-gold text-sm">★</span>
            <span className="font-body text-white/80 text-sm font-medium">{city.highlight}</span>
          </div>
        </div>
      </div>

      {/* ── Filter & Content ─────────────────────────────── */}
      <div className="bg-white sticky top-16 md:top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <CategoryFilter
              active={activeTab}
              onChange={cat => setActiveTab(cat as Tab)}
              counts={counts}
            />
            {/* Search */}
            <div className="relative sm:ml-auto">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari di sini..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 font-body 
                           text-sm focus:outline-none focus:ring-2 focus:ring-aceh-green/30 w-48 md:w-60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Places Grid ──────────────────────────────────── */}
      <div className="bg-aceh-cream min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Result header */}
          {!loading && (
            <p className="font-body text-sm text-gray-500 mb-6">
              Menampilkan <span className="font-semibold text-aceh-green">{filtered.length}</span> tempat
              {activeTab !== 'semua' && (
                <> kategori <span className="font-semibold text-aceh-green">
                  {CATEGORY_ICONS[activeTab as PlaceCategory]} {CATEGORY_LABELS[activeTab as PlaceCategory]}
                </span></>
              )}
              {' '}di <span className="font-semibold text-aceh-green">{city.name}</span>
            </p>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <PlaceCardSkeleton key={i} />)}
            </div>
          )}

          {/* Results */}
          {!loading && filtered.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, 6).map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>

              {/* Ad between rows */}
              {filtered.length > 6 && (
                <div className="my-8">
                  <AdBanner slot="5566778899" format="fluid" />
                </div>
              )}

              {filtered.length > 6 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filtered.slice(6).map(place => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="font-display text-xl text-gray-700 mb-2">Belum ada data</h3>
              <p className="font-body text-gray-400 text-sm mb-6">
                {places.length === 0
                  ? `Data untuk ${city.name} belum tersedia. Kami sedang mengumpulkan informasi.`
                  : 'Tidak ada tempat yang cocok dengan filter kamu.'
                }
              </p>
              {activeTab !== 'semua' && (
                <button onClick={() => setActiveTab('semua')} className="btn-primary">
                  Lihat Semua
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Other cities CTA ─────────────────────────────── */}
      <section className="bg-aceh-green py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-2xl mb-2">
            Jelajahi Kota Lain di Aceh
          </h2>
          <p className="font-body text-white/60 text-sm mb-8">
            Aceh memiliki 23 kabupaten/kota dengan keunikannya masing-masing.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CITIES.filter(c => c.slug !== cityName).slice(0, 10).map(c => (
              <Link
                key={c.slug}
                href={`/city/${c.slug}`}
                className="font-body text-sm text-white/70 border border-white/20 rounded-full 
                           px-4 py-2 hover:border-aceh-gold hover:text-aceh-gold transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense sticky mobile */}
      <div className="sticky bottom-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg max-h-[90px] overflow-hidden">
  <AdBanner slot="9988776655" format="horizontal" />
</div>
    </div>
  )
}
