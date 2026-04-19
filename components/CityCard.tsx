import Link from 'next/link'
import Image from 'next/image'
import type { City } from '@/types'

interface CityCardProps {
  city: City
  size?: 'default' | 'large'
}

export default function CityCard({ city, size = 'default' }: CityCardProps) {
  const h = size === 'large' ? 'h-64 md:h-80' : 'h-52'

  return (
    <Link
      href={`/city/${city.slug}`}
      className={`group relative block rounded-2xl overflow-hidden shadow-md card-hover ${h}`}
    >
      {/* Background image */}
      <Image
        src={city.image}
        alt={city.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Batik pattern overlay */}
      <div className="absolute inset-0 bg-batik-pattern opacity-20" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-body text-xs text-aceh-amber uppercase tracking-widest mb-1">
              {city.province}
            </p>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl leading-tight">
              {city.name}
            </h3>
            <p className="font-body text-xs text-white/70 mt-1 flex items-center gap-1">
              <span className="text-aceh-gold">★</span>
              {city.highlight}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all group-hover:bg-aceh-gold group-hover:border-aceh-gold">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
