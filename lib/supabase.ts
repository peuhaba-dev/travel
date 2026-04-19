import { createClient } from '@supabase/supabase-js'
import type { TravelPlace } from '@/types'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Queries ──────────────────────────────────────────────

export async function getPlacesByCity(city: string): Promise<TravelPlace[]> {
  const { data, error } = await supabase
    .from('travel_places')
    .select('*')
    .eq('location', city)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getPlacesByCity error:', error)
    return []
  }
  return data ?? []
}

export async function getPlaceById(id: string): Promise<TravelPlace | null> {
  const { data, error } = await supabase
    .from('travel_places')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('getPlaceById error:', error)
    return null
  }
  return data
}

export async function getFeaturedPlaces(limit = 6): Promise<TravelPlace[]> {
  const { data, error } = await supabase
    .from('travel_places')
    .select('*')
    .not('rating', 'is', null)
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getFeaturedPlaces error:', error)
    return []
  }
  return data ?? []
}

export async function searchPlaces(query: string): Promise<TravelPlace[]> {
  const { data, error } = await supabase
    .from('travel_places')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('searchPlaces error:', error)
    return []
  }
  return data ?? []
}
