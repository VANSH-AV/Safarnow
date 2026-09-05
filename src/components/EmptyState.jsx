import { Search } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Search,
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-light rounded-2xl flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-dark mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-sm mb-6">{description}</p>
      {actionLabel && actionTo && (
        <a
          href={actionTo}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue/90 transition-colors"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
