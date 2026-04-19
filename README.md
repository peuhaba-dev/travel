# 🌿 Meureno Travel Guide

Panduan wisata Aceh terlengkap — platform travel directory berbasis Next.js 15 + Supabase.

---

## Stack

| Layer     | Teknologi                          |
|-----------|------------------------------------|
| Frontend  | Next.js 15 (App Router), TypeScript |
| Styling   | TailwindCSS 3                      |
| Backend   | Supabase Self-hosted               |
| Hosting   | Vercel / Docker                    |
| Monetisasi| Google AdSense                     |

---

## Cara Install

```bash
# 1. Clone / extract project
cd meureno-travel

# 2. Install dependencies
npm install

# 3. Buat file .env.local
cp .env.local .env.local
# Isi variabel berikut:

NEXT_PUBLIC_SUPABASE_URL=https://database.meureno.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key_kamu>
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1150834306562665

# 4. Jalankan development
npm run dev
```

---

## Setup Database Supabase

1. Buka **SQL Editor** di `https://database.meureno.com`
2. Paste & jalankan seluruh isi `schema.sql`
3. Tabel `travel_places` akan otomatis dibuat dengan RLS aktif

### Struktur Tabel `travel_places`

| Kolom        | Tipe        | Keterangan                                      |
|--------------|-------------|-------------------------------------------------|
| id           | UUID        | Primary key, auto-generate                      |
| title        | TEXT        | Nama tempat                                     |
| description  | TEXT        | Deskripsi lengkap                               |
| location     | TEXT        | Slug kota (`banda-aceh`, `sabang`, dll)         |
| category     | TEXT        | `wisata` / `kuliner` / `penginapan` / `transportasi` / `aktivitas` |
| image        | TEXT        | URL gambar                                      |
| rating       | NUMERIC     | 0.0 – 5.0                                       |
| address      | TEXT        | Alamat lengkap                                  |
| phone        | TEXT        | Nomor telepon                                   |
| website      | TEXT        | URL website                                     |
| price_range  | TEXT        | Contoh: `Rp 50.000 – 150.000`                  |
| tags         | TEXT[]      | Array tag                                       |
| created_at   | TIMESTAMPTZ | Auto timestamp                                  |

---

## Slug Kota yang Tersedia

```
banda-aceh, sabang, aceh-besar, pidie, pidie-jaya, bireuen,
lhokseumawe, aceh-utara, lhoksukon, langsa, aceh-timur,
takengon, bener-meriah, gayo-lues, kutacane, aceh-jaya,
meulaboh, nagan-raya, abdya, tapak-tuan, subulussalam,
singkil, simeulue
```

---

## Struktur Folder

```
meureno-travel/
├── app/
│   ├── layout.tsx          # Root layout + font + AdSense
│   ├── globals.css         # Design system
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404 page
│   ├── city/[cityName]/
│   │   └── page.tsx        # Halaman per kota
│   ├── place/[id]/
│   │   └── page.tsx        # Detail tempat
│   └── api/
│       ├── places/route.ts # GET ?city= / ?q= / ?featured=
│       └── place/[id]/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── CityCard.tsx
│   ├── CitySelector.tsx
│   ├── PlaceCard.tsx
│   ├── CategoryFilter.tsx
│   ├── AdBanner.tsx        # Google AdSense component
│   ├── AdSenseScript.tsx   # Script inject di <head>
│   └── Skeleton.tsx
├── lib/
│   └── supabase.ts         # Client + query functions
├── types/
│   └── index.ts            # TravelPlace, City, CITIES[]
├── schema.sql              # Script database Supabase
└── .env.local              # Environment variables
```

---

## Deploy ke Vercel

```bash
# Build production
npm run build

# Deploy via Vercel CLI
vercel --prod
```

Tambahkan environment variables di **Vercel Dashboard → Settings → Environment Variables**.

---

## Google AdSense

Slot iklan tersedia di:
1. **Homepage** — antara section Featured (slot `1234567890`)
2. **City page** — antara grid listing (slot `5566778899`)
3. **Place detail** — content area + sidebar (slot `2233445566`, `3344556677`)
4. **Mobile sticky** — bottom bar (slot `1122334455`, `9988776655`)

Ganti slot ID placeholder dengan ID AsliAdSense kamu di masing-masing komponen.

---

## Monetisasi Lanjutan

- ✅ **AdSense** — sudah terintegrasi
- 🔜 **Listing berbayar** — hotel/restoran bisa bayar untuk featured
- 🔜 **Afiliasi** — link hotel ke Booking.com / Traveloka
- 🔜 **Iklan lokal** — banner iklan bisnis Aceh

---

Dibuat dengan ❤️ untuk Aceh — **Tanah Rencong**
