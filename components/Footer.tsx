import Link from 'next/link'
import { CITIES } from '@/types'

export default function Footer() {
  const featuredCities = CITIES.slice(0, 8)

  return (
    <footer className="bg-aceh-dark text-white">
      {/* Top pattern strip */}
      <div className="h-1 bg-gradient-to-r from-aceh-gold via-aceh-light to-aceh-teal" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-aceh-gold rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-xl text-aceh-dark">M</span>
              </div>
              <div>
                <p className="font-display font-bold text-lg text-white">Meureno</p>
                <p className="font-body text-xs tracking-widest text-aceh-amber uppercase">Travel Guide</p>
              </div>
            </div>
            <p className="font-body text-sm text-gray-400 leading-relaxed">
              Panduan wisata lokal terlengkap untuk Tanah Rencong. 
              Jelajahi keindahan Aceh bersama kami.
            </p>
            <p className="mt-4 text-xs text-aceh-gold font-body tracking-wider uppercase">
              🌿 Jelajahi Tanah Rencong
            </p>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Kota Populer
            </h4>
            <ul className="space-y-2">
              {featuredCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/city/${city.slug}`}
                    className="font-body text-sm text-gray-400 hover:text-aceh-gold transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Kategori Wisata
            </h4>
            <ul className="space-y-2">
              {[
                { icon: '🏛️', label: 'Wisata Budaya' },
                { icon: '🍜', label: 'Kuliner Khas' },
                { icon: '🏨', label: 'Penginapan' },
                { icon: '🏄', label: 'Aktivitas Alam' },
                { icon: '🚌', label: 'Transportasi' },
                { icon: '☕', label: 'Kopi Gayo' },
              ].map(({ icon, label }) => (
                <li key={label} className="font-body text-sm text-gray-400 flex items-center gap-2">
                  <span>{icon}</span>{label}
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Tentang Kami
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Tentang Meureno' },
                { href: '/', label: 'Kebijakan Privasi' },
                { href: '/', label: 'Syarat & Ketentuan' },
                { href: '/', label: 'Pasang Iklan' },
                { href: '/', label: 'Hubungi Kami' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="font-body text-sm text-gray-400 hover:text-aceh-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-500">
            © {new Date().getFullYear()} Meureno Travel Guide. Hak cipta dilindungi.
          </p>
          <p className="font-body text-xs text-gray-500">
            Dibuat dengan ❤️ untuk Aceh — <span className="text-aceh-gold">Tanah Rencong</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
