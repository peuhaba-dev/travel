'use client'

import type { PlaceCategory } from '@/types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/types'

const ALL = 'semua'

interface CategoryFilterProps {
  active: PlaceCategory | typeof ALL
  onChange: (cat: PlaceCategory | typeof ALL) => void
  counts?: Partial<Record<PlaceCategory | typeof ALL, number>>
}

const CATEGORIES: Array<{ key: PlaceCategory | typeof ALL; label: string; icon: string }> = [
  { key: 'semua',       label: 'Semua',       icon: '🗺️' },
  { key: 'wisata',      label: CATEGORY_LABELS.wisata,       icon: CATEGORY_ICONS.wisata },
  { key: 'kuliner',     label: CATEGORY_LABELS.kuliner,      icon: CATEGORY_ICONS.kuliner },
  { key: 'penginapan',  label: CATEGORY_LABELS.penginapan,   icon: CATEGORY_ICONS.penginapan },
  { key: 'aktivitas',   label: CATEGORY_LABELS.aktivitas,    icon: CATEGORY_ICONS.aktivitas },
  { key: 'transportasi',label: CATEGORY_LABELS.transportasi, icon: CATEGORY_ICONS.transportasi },
]

export default function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ key, label, icon }) => {
        const isActive = active === key
        const count = counts?.[key]
        return (
          <button
            key={key}
            onClick={() => onChange(key as PlaceCategory | typeof ALL)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
              isActive ? 'tab-active' : 'tab-inactive'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
            {count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ml-0.5 ${
                isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
