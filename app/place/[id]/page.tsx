import type { Metadata } from 'next'
import Image from 'next/image'
import Link  from 'next/link'
import { notFound } from 'next/navigation'
import { getPlaceById, getPlacesByCity } from '@/lib/supabase'
import { CITIES, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types'
import PlaceCard from '@/components/PlaceCard'
import AdBanner  from '@/components/AdBanner'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const place = await getPlaceById(id)
  if (!place) return { title: 'Tempat Tidak Ditemukan' }
  return {
    title: `${place.title} — Meureno Travel Guide`,
    description: place.description,
  }
}

const STAR_COLORS = ['text-gray-300', 'text-yellow-400', 'text-yellow-400', 'text-yellow-400']

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-aceh-gold' : 'text-gray-200'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="font-body font-semibold text-gray-700 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export default async function PlaceDetailPage({ params }: Props) {
  const { id }  = await params
  const place   = await getPlaceById(id)
  if (!place) notFound()

  const city     = CITIES.find(c => c.slug === place.location)
  const related  = await getPlacesByCity(place.location)
  const others   = related.filter(p => p.id !== place.id).slice(0, 3)

  return (
    <div className="pt-16 md:pt-20">

      {/* ── Hero Image ──────────────────────────────────── */}
      <div className="relative h-[50vh] min-h-[320px] bg-aceh-sand overflow-hidden">
        {place.image ? (
          <Image
            src={place.image}
            alt={place.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl opacity-20">{CATEGORY_ICONS[place.category]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Floating category badge */}
        <div className="absolute top-6 left-6">
          <span className="badge bg-white/95 text-gray-800 shadow-md text-sm px-4 py-2">
            {CATEGORY_ICONS[place.category]} {CATEGORY_LABELS[place.category]}
          </span>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="bg-aceh-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left — main info */}
            <div className="lg:col-span-2 space-y-8">

              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-body text-gray-400">
                <Link href="/" className="hover:text-aceh-green transition-colors">Beranda</Link>
                <span>/</span>
                {city && (
                  <>
                    <Link href={`/city/${city.slug}`} className="hover:text-aceh-green transition-colors">
                      {city.name}
                    </Link>
                    <span>/</span>
                  </>
                )}
                <span className="text-gray-700">{place.title}</span>
              </nav>

              {/* Title & rating */}
              <div>
                <h1 className="font-display font-bold text-aceh-green text-3xl md:text-4xl mb-3 leading-tight">
                  {place.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4">
                  {place.rating && <StarRating rating={place.rating} />}

                  <div className="flex items-center gap-1.5 text-gray-500">
                    <svg className="w-4 h-4 text-aceh-teal" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd" />
                    </svg>
                    <span className="font-body text-sm capitalize">
                      {place.location.replace(/-/g, ' ')}
                      {city && `, ${city.province}`}
                    </span>
                  </div>

                  {place.price_range && (
                    <span className="font-body text-sm font-semibold text-aceh-teal bg-aceh-teal/10 
                                     px-3 py-1 rounded-full">
                      {place.price_range}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-display font-semibold text-aceh-green text-lg mb-3">
                  Tentang Tempat Ini
                </h2>
                <p className="font-body text-gray-600 leading-relaxed">{place.description}</p>
              </div>

              {/* Tags */}
              {place.tags && place.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {place.tags.map(tag => (
                    <span key={tag}
                      className="font-body text-xs text-aceh-green bg-aceh-green/10 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Ad in content area */}
              <AdBanner slot="2233445566" format="rectangle" className="rounded-xl overflow-hidden" />

              {/* Related places */}
              {others.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-aceh-green text-xl mb-5">
                    Tempat Lain di {city?.name ?? place.location}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {others.map(p => <PlaceCard key={p.id} place={p} />)}
                  </div>
                </div>
              )}
            </div>

            {/* Right — sidebar info card */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
                <h3 className="font-display font-semibold text-aceh-green text-base mb-4">
                  Informasi Kontak
                </h3>
                <ul className="space-y-4">
                  {place.address && (
                    <li className="flex gap-3">
                      <svg className="w-5 h-5 text-aceh-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd" />
                      </svg>
                      <span className="font-body text-sm text-gray-600">{place.address}</span>
                    </li>
                  )}
                  {place.phone && (
                    <li className="flex gap-3">
                      <svg className="w-5 h-5 text-aceh-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a href={`tel:${place.phone}`}
                        className="font-body text-sm text-aceh-teal hover:underline">
                        {place.phone}
                      </a>
                    </li>
                  )}
                  {place.website && (
                    <li className="flex gap-3">
                      <svg className="w-5 h-5 text-aceh-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={place.website} target="_blank" rel="noopener noreferrer"
                        className="font-body text-sm text-aceh-teal hover:underline break-all">
                        {place.website.replace(/^https?:\/\//, '')}
                      </a>
                    </li>
                  )}
                </ul>

                {/* CTA: Back to city */}
                {city && (
                  <Link href={`/city/${city.slug}`}
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl
                               bg-aceh-green text-white font-body font-semibold text-sm
                               hover:bg-aceh-dark transition-colors">
                    Jelajahi {city.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Sidebar ad */}
              <AdBanner slot="3344556677" format="vertical" className="rounded-xl overflow-hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
