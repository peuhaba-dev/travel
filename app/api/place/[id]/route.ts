import { NextRequest, NextResponse } from 'next/server'
import { getPlaceById } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const place = await getPlaceById(id)
    if (!place) {
      return NextResponse.json({ error: 'Tempat tidak ditemukan.' }, { status: 404 })
    }
    return NextResponse.json(place)
  } catch (err) {
    console.error('/api/place/[id] error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan server.' }, { status: 500 })
  }
}
