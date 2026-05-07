function SkeletonBlock({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
      <SkeletonBlock className="h-4 w-1/3" />
      <SkeletonBlock className="h-8 w-1/2" />
      <SkeletonBlock className="h-3 w-1/4" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-50">
      <SkeletonBlock className="h-10 w-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-3.5 w-2/5" />
        <SkeletonBlock className="h-3 w-1/4" />
      </div>
      <SkeletonBlock className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <SkeletonBlock className="h-4 w-1/4" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
