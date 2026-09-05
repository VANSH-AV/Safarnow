export function SkeletonLine({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
}

export function SkeletonCircle({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-full ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <SkeletonLine className="h-52 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <SkeletonLine className="h-4 w-24" />
        <SkeletonLine className="h-6 w-3/4" />
        <SkeletonLine className="h-4 w-32" />
        <div className="flex justify-between items-center pt-2">
          <SkeletonLine className="h-8 w-20" />
          <SkeletonLine className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4"
        >
          <SkeletonCircle className="w-12 h-12 shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonLine className="h-4 w-1/3" />
            <SkeletonLine className="h-3 w-2/3" />
          </div>
          <SkeletonLine className="h-8 w-16 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonLine key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <SkeletonLine key={c} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (type === 'list') return <ListSkeleton count={count} />;
  if (type === 'table') return <TableSkeleton />;

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-5/6" />
          <SkeletonLine className="h-4 w-4/6" />
        </div>
      ))}
    </div>
  );
}
