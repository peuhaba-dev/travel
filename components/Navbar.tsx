'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-aceh-green rounded-lg flex items-center justify-center shadow-md group-hover:bg-aceh-dark transition-colors">
              <span className="text-aceh-gold font-display font-bold text-lg">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-display font-bold text-lg transition-colors ${
                scrolled || !isHome ? 'text-aceh-green' : 'text-white'
              }`}>
                Meureno
              </span>
              <span className={`font-body text-xs tracking-widest uppercase transition-colors ${
                scrolled || !isHome ? 'text-aceh-gold' : 'text-aceh-amber'
              }`}>
                Travel Guide
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: '/', label: 'Beranda' },
              { href: '/city/banda-aceh', label: 'Kota' },
              { href: '/city/sabang', label: 'Sabang' },
              { href: '/city/takengon', label: 'Dataran Tinggi' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-body text-sm font-medium transition-colors hover:text-aceh-gold ${
                  scrolled || !isHome ? 'text-gray-700' : 'text-white/90'
                } ${pathname === href ? 'text-aceh-gold!' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {[
              { href: '/', label: '🏠 Beranda' },
              { href: '/city/banda-aceh', label: '🕌 Banda Aceh' },
              { href: '/city/sabang', label: '🏝️ Sabang' },
              { href: '/city/takengon', label: '⛰️ Takengon' },
              { href: '/city/bireuen', label: '🍢 Bireuen' },
              { href: '/city/langsa', label: '🌿 Langsa' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-3 rounded-xl font-body text-gray-700 hover:bg-aceh-sand hover:text-aceh-green transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
