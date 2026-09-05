import { Star } from 'lucide-react';

export default function RatingStars({ rating, maxRating = 5, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => {
        const fill = rating - i;
        return (
          <Star
            key={i}
            className={`${sizeClass} ${
              fill >= 1
                ? 'fill-yellow-400 text-yellow-400'
                : fill >= 0.5
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'text-gray-200'
            }`}
          />
        );
      })}
    </div>
  );
}
