import Link from 'next/link'
import Image from 'next/image'
import type { TravelPlace } from '@/types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/types'

interface PlaceCardProps {
  place: TravelPlace
  className?: string
}

const CATEGORY_COLORS: Record<string, string> = {
  wisata:       'bg-emerald-100 text-emerald-800',
  kuliner:      'bg-orange-100 text-orange-800',
  penginapan:   'bg-blue-100 text-blue-800',
  transportasi: 'bg-gray-100 text-gray-800',
  aktivitas:    'bg-purple-100 text-purple-800',
}

export default function PlaceCard({ place, className = '' }: PlaceCardProps) {
  return (
    <Link
      href={`/place/${place.id}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover ${className}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-aceh-sand">
        {place.image ? (
          <Image
            src={place.image}
            alt={place.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">
              {CATEGORY_ICONS[place.category] ?? '📍'}
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${CATEGORY_COLORS[place.category] ?? 'bg-gray-100 text-gray-700'}`}>
            {CATEGORY_ICONS[place.category]} {CATEGORY_LABELS[place.category]}
          </span>
        </div>

        {/* Rating */}
        {place.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <span className="text-aceh-gold text-xs">★</span>
            <span className="font-body font-semibold text-xs text-gray-800">
              {place.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 text-base mb-1 line-clamp-1 group-hover:text-aceh-green transition-colors">
          {place.title}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <svg className="w-3.5 h-3.5 text-aceh-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-body text-xs text-gray-500 capitalize">
            {place.location.replace(/-/g, ' ')}
          </span>
        </div>

        <p className="font-body text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {place.description}
        </p>

        {place.price_range && (
          <p className="mt-2 font-body text-xs font-semibold text-aceh-teal">
            {place.price_range}
          </p>
        )}

        <div className="mt-3 flex items-center text-aceh-green text-xs font-body font-semibold group-hover:gap-2 gap-1 transition-all">
          <span>Lihat detail</span>
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
