export function PlaceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
      </div>
    </div>
  )
}

export function CityCardSkeleton() {
  return <div className="skeleton h-52 w-full rounded-2xl" />
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-5 w-96" />
    </div>
  )
}
