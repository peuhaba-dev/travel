import type { Metadata } from 'next'
import HeroSection  from '@/components/HeroSection'
import CityCard     from '@/components/CityCard'
import CitySelector from '@/components/CitySelector'
import PlaceCard    from '@/components/PlaceCard'
import AdBanner     from '@/components/AdBanner'
import { CITIES }   from '@/types'
import { getFeaturedPlaces } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Meureno Travel Guide — Panduan Wisata Aceh',
}

export const revalidate = 3600 // ISR: refresh setiap 1 jam

export default async function HomePage() {
  const featured = await getFeaturedPlaces(6)

  // 4 kota unggulan untuk hero grid
  const heroCity  = CITIES.find(c => c.slug === 'sabang')!
  const topCities = [
    CITIES.find(c => c.slug === 'banda-aceh')!,
    CITIES.find(c => c.slug === 'takengon')!,
    CITIES.find(c => c.slug === 'bireuen')!,
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Kota Unggulan ────────────────────────────────── */}
      <section className="py-20 bg-aceh-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-xs text-aceh-teal uppercase tracking-widest font-semibold mb-2">
                Destinasi Terpopuler
              </p>
              <h2 className="section-title">Kota Unggulan Aceh</h2>
            </div>
          </div>

          {/* Featured city grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Large hero city */}
            <div className="md:col-span-2">
              <CityCard city={heroCity} size="large" />
            </div>
            {/* Stack of 2 */}
            <div className="flex flex-col gap-4">
              <CityCard city={topCities[0]} />
              <CityCard city={topCities[1]} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CityCard city={topCities[2]} />
            <CityCard city={CITIES.find(c => c.slug === 'langsa')!} />
            <CityCard city={CITIES.find(c => c.slug === 'singkil')!} />
          </div>
        </div>
      </section>

      {/* ── AdSense #1 ───────────────────────────────────── */}
      <div className="bg-aceh-sand py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner slot="1234567890" format="horizontal" className="rounded-xl overflow-hidden" />
        </div>
      </div>

      {/* ── Jelajahi Semua Kota ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-xs text-aceh-teal uppercase tracking-widest font-semibold mb-2">
              Peta Wisata Aceh
            </p>
            <h2 className="section-title mb-3">Jelajahi 23 Kabupaten/Kota</h2>
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Setiap daerah di Aceh menyimpan keajaiban tersendiri. 
              Pilih destinasimu dan mulailah petualangan.
            </p>
          </div>
          <CitySelector cities={CITIES} />
        </div>
      </section>

      {/* ── Tempat Terbaik ───────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-20 bg-aceh-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs text-aceh-teal uppercase tracking-widest font-semibold mb-2">
                  Rating Tertinggi
                </p>
                <h2 className="section-title">Tempat Terbaik Pilihan Wisatawan</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 3).map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>

            {/* AdSense #2 — between featured rows */}
            {featured.length > 3 && (
              <div className="my-8">
                <AdBanner slot="0987654321" format="fluid" />
              </div>
            )}

            {featured.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.slice(3).map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Kenapa Aceh? ─────────────────────────────────── */}
      <section className="py-24 bg-aceh-green relative overflow-hidden">
        <div className="absolute inset-0 bg-batik-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
              Mengapa Mengunjungi Aceh?
            </h2>
            <p className="font-body text-white/60 max-w-xl mx-auto">
              Aceh bukan sekadar destinasi — ini adalah pengalaman budaya, alam, 
              dan kuliner yang tak akan terlupakan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🕌',
                title: 'Warisan Islam',
                desc:  'Masjid-masjid bersejarah dan tradisi Islam yang mengakar kuat sejak berabad-abad.',
              },
              {
                icon: '🌿',
                title: 'Alam Liar',
                desc:  'Taman Nasional Leuser — satu-satunya tempat di bumi dengan harimau, gajah, badak, dan orangutan berdampingan.',
              },
              {
                icon: '☕',
                title: 'Kopi Gayo',
                desc:  'Kopi arabika Gayo termasuk yang terbaik dan paling dicari di seluruh dunia.',
              },
              {
                icon: '🏄',
                title: 'Surf & Dive',
                desc:  'Ombak Simeulue dan terumbu karang Sabang — surga bagi peselancar dan penyelam dunia.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                           hover:bg-white/15 transition-colors"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AdSense #3 — sticky bottom (mobile) ─────────── */}
      <div className="sticky bottom-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
        <AdBanner slot="1122334455" format="auto" label="Iklan" className="py-1 px-2" />
      </div>
    </>
  )
}
