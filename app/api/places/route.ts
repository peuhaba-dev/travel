import { NextRequest, NextResponse } from 'next/server'
import { getPlacesByCity, getFeaturedPlaces, searchPlaces } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const city    = searchParams.get('city')
  const search  = searchParams.get('q')
  const feature = searchParams.get('featured')

  try {
    if (search) {
      const data = await searchPlaces(search)
      return NextResponse.json(data)
    }

    if (feature === 'true') {
      const limit = parseInt(searchParams.get('limit') ?? '6', 10)
      const data  = await getFeaturedPlaces(limit)
      return NextResponse.json(data)
    }

    if (city) {
      const data = await getPlacesByCity(city)
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Parameter city atau q diperlukan.' }, { status: 400 })
  } catch (err) {
    console.error('/api/places error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan server.' }, { status: 500 })
  }
}
