import { User } from 'lucide-react';
import RatingStars from './RatingStars';

export default function ReviewCard({ review }) {
  const { user, rating, comment, date } = review;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-blue/10 rounded-full flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-dark truncate">
              {user || 'Anonymous Traveler'}
            </p>
            {date && (
              <span className="text-xs text-muted shrink-0 ml-2">{date}</span>
            )}
          </div>
          <div className="mb-2">
            <RatingStars rating={rating} />
          </div>
          <p className="text-sm text-muted leading-relaxed">{comment}</p>
        </div>
      </div>
    </div>
  );
}
