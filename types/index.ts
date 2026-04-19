export type PlaceCategory = 'wisata' | 'kuliner' | 'penginapan' | 'transportasi' | 'aktivitas'

export interface TravelPlace {
  id: string
  title: string
  description: string
  location: string   // city slug, e.g. "banda-aceh"
  category: PlaceCategory
  image: string | null
  rating: number | null
  address: string | null
  phone: string | null
  website: string | null
  price_range: string | null
  tags: string[] | null
  created_at: string
}

export interface City {
  slug: string
  name: string
  province: string
  description: string
  image: string
  highlight: string
}

export const CITIES: City[] = [
  {
    slug: 'banda-aceh',
    name: 'Banda Aceh',
    province: 'Aceh',
    description: 'Ibu kota provinsi dengan kekayaan sejarah dan budaya Islam yang mendalam.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    highlight: 'Masjid Raya Baiturrahman',
  },
  {
    slug: 'sabang',
    name: 'Sabang',
    province: 'Aceh',
    description: 'Pulau Weh — surga bawah laut di ujung barat Indonesia.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    highlight: 'Pantai Iboih & Diving',
  },
  {
    slug: 'aceh-besar',
    name: 'Aceh Besar',
    province: 'Aceh',
    description: 'Benteng sejarah Kesultanan Aceh dan bentang alam yang memukau.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    highlight: 'Benteng Indra Patra',
  },
  {
    slug: 'pidie',
    name: 'Pidie',
    province: 'Aceh',
    description: 'Kota tua penghasil rempah dengan kuliner khas yang tak terlupakan.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800',
    highlight: 'Pasar Inpres Sigli',
  },
  {
    slug: 'pidie-jaya',
    name: 'Pidie Jaya',
    province: 'Aceh',
    description: 'Pesisir pantai barat dengan ombak legendaris bagi para peselancar.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    highlight: 'Ombak Meureudu',
  },
  {
    slug: 'bireuen',
    name: 'Bireuen',
    province: 'Aceh',
    description: 'Kota kuliner dengan sate matang dan soto khas yang mendunia.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    highlight: 'Sate Matang Bireuen',
  },
  {
    slug: 'lhokseumawe',
    name: 'Lhokseumawe',
    province: 'Aceh',
    description: 'Kota industri dengan pesisir indah dan kuliner laut segar.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    highlight: 'Pantai Ujong Blang',
  },
  {
    slug: 'aceh-utara',
    name: 'Aceh Utara',
    province: 'Aceh',
    description: 'Hamparan sawah dan ekosistem bakau yang masih alami.',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800',
    highlight: 'Hutan Mangrove Kuala Teunom',
  },
  {
    slug: 'lhoksukon',
    name: 'Lhoksukon',
    province: 'Aceh',
    description: 'Ibukota Aceh Utara dengan pasar tradisional yang hidup.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    highlight: 'Pasar Tradisional Lhoksukon',
  },
  {
    slug: 'langsa',
    name: 'Langsa',
    province: 'Aceh',
    description: 'Kota hutan mangrove terluas dan ekowisata yang berkembang pesat.',
    image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800',
    highlight: 'Hutan Mangrove Kuala Langsa',
  },
  {
    slug: 'aceh-timur',
    name: 'Aceh Timur',
    province: 'Aceh',
    description: 'Perbatasan alam liar antara pegunungan dan lautan.',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
    highlight: 'Pantai Kuala Peudawa',
  },
  {
    slug: 'takengon',
    name: 'Takengon',
    province: 'Aceh',
    description: 'Dataran tinggi Gayo — negeri kopi arabika terbaik dunia.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
    highlight: 'Danau Laut Tawar & Kopi Gayo',
  },
  {
    slug: 'bener-meriah',
    name: 'Bener Meriah',
    province: 'Aceh',
    description: 'Perkebunan kopi Gayo di atas awan dengan udara yang sejuk.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    highlight: 'Kebun Kopi Gayo',
  },
  {
    slug: 'gayo-lues',
    name: 'Gayo Lues',
    province: 'Aceh',
    description: 'Jantung Taman Nasional Leuser — surga keanekaragaman hayati.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    highlight: 'Taman Nasional Leuser',
  },
  {
    slug: 'kutacane',
    name: 'Kutacane',
    province: 'Aceh',
    description: 'Pintu masuk arung jeram Sungai Alas yang memacu adrenalin.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
    highlight: 'Arung Jeram Sungai Alas',
  },
  {
    slug: 'aceh-jaya',
    name: 'Aceh Jaya',
    province: 'Aceh',
    description: 'Pantai barat yang dramatis dengan tebing karang dan laut biru.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    highlight: 'Pantai Lhok Mee',
  },
  {
    slug: 'meulaboh',
    name: 'Meulaboh',
    province: 'Aceh',
    description: 'Kota pantai barat dengan sejarah perjuangan dan alam yang indah.',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800',
    highlight: 'Pantai Suak Ribee',
  },
  {
    slug: 'nagan-raya',
    name: 'Nagan Raya',
    province: 'Aceh',
    description: 'Perkebunan sawit dan pesisir yang masih alami di barat Aceh.',
    image: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800',
    highlight: 'Kawasan Ekosistem Leuser',
  },
  {
    slug: 'abdya',
    name: 'Abdya',
    province: 'Aceh',
    description: 'Aceh Barat Daya — pesona alam pegunungan Bukit Barisan dan pantai.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    highlight: 'Pantai Babah Rot',
  },
  {
    slug: 'tapak-tuan',
    name: 'Tapak Tuan',
    province: 'Aceh',
    description: 'Ibukota Aceh Selatan dengan legenda Tapak Tuan yang menawan.',
    image: 'https://images.unsplash.com/photo-1518399681705-1c1a55e5e883?w=800',
    highlight: 'Gua Kuta Tinggi',
  },
  {
    slug: 'subulussalam',
    name: 'Subulussalam',
    province: 'Aceh',
    description: 'Kota otonom di perbatasan Sumatera Utara dengan keindahan alam.',
    image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800',
    highlight: 'Air Terjun Lae Kombih',
  },
  {
    slug: 'singkil',
    name: 'Singkil',
    province: 'Aceh',
    description: 'Kepulauan Banyak — gugusan pulau tropis yang hampir tak tersentuh.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    highlight: 'Kepulauan Banyak',
  },
  {
    slug: 'simeulue',
    name: 'Simeulue',
    province: 'Aceh',
    description: 'Pulau terpencil dengan ombak kelas dunia dan terumbu karang pristine.',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800',
    highlight: 'Ombak Simeulue & Diving',
  },
]

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  wisata:       'Wisata',
  kuliner:      'Kuliner',
  penginapan:   'Penginapan',
  transportasi: 'Transportasi',
  aktivitas:    'Aktivitas',
}

export const CATEGORY_ICONS: Record<PlaceCategory, string> = {
  wisata:       '🏛️',
  kuliner:      '🍜',
  penginapan:   '🏨',
  transportasi: '🚌',
  aktivitas:    '🏄',
}
