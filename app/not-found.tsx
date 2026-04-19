import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-aceh-cream flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🗺️</div>
        <h1 className="font-display font-bold text-aceh-green text-4xl mb-3">404</h1>
        <h2 className="font-display font-semibold text-gray-700 text-xl mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="font-body text-gray-500 text-base mb-8 leading-relaxed">
          Sepertinya kamu tersesat. Halaman yang kamu cari tidak tersedia. 
          Yuk kembali dan jelajahi Aceh bersama kami.
        </p>
        <Link href="/" className="btn-primary">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
