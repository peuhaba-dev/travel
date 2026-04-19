import Link from 'next/link'
import type { City } from '@/types'

interface CitySelectorProps {
  cities: City[]
}

export default function CitySelector({ cities }: CitySelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {cities.map(city => (
        <Link
          key={city.slug}
          href={`/city/${city.slug}`}
          className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl 
                     border border-gray-100 shadow-sm hover:shadow-md hover:border-aceh-gold/40 
                     hover:-translate-y-0.5 transition-all duration-200 text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-aceh-green/10 flex items-center justify-center
                          group-hover:bg-aceh-green transition-colors duration-200">
            <svg className="w-6 h-6 text-aceh-green group-hover:text-white transition-colors" 
              fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" 
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-body font-medium text-gray-800 text-xs leading-tight 
                           group-hover:text-aceh-green transition-colors">
            {city.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
