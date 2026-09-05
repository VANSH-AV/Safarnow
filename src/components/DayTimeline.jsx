import { MapPin, Clock, IndianRupee, Utensils, Camera, Car, Hotel, Footprints } from 'lucide-react';

const activityIcons = {
  sightseeing: Camera,
  food: Utensils,
  transport: Car,
  hotel: Hotel,
  walking: Footprints,
};

export default function DayTimeline({ day, activities }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0">
          {day}
        </div>
        <h3 className="text-lg font-bold text-dark">Day {day}</h3>
      </div>

      <div className="relative pl-14">
        <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gray-200" />

        {activities.map((activity, i) => {
          const Icon = activityIcons[activity.type] || MapPin;
          return (
            <div key={i} className="relative mb-6 last:mb-0">
              <div className="absolute -left-14 top-1 w-5 h-5 bg-white border-2 border-blue rounded-full z-10" />

              <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-muted font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </span>
                      {activity.duration && (
                        <span className="text-xs text-muted">
                          · {activity.duration}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-dark mb-1">
                      {activity.name}
                    </h4>
                    {activity.description && (
                      <p className="text-xs text-muted mb-2">
                        {activity.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3">
                      {activity.cost !== undefined && (
                        <span className="text-xs font-medium text-dark flex items-center gap-1">
                          <IndianRupee className="w-3 h-3 text-muted" />
                          {activity.cost === 0 ? 'Free' : `₹${activity.cost}`}
                        </span>
                      )}
                      {activity.location && (
                        <span className="text-xs text-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
