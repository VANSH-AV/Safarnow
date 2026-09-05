import { Tag, ShieldCheck, Calendar, Users } from 'lucide-react';

export default function BookingSummary({ booking }) {
  const {
    title,
    dates,
    guests,
    items,
    safetyFee,
    discount,
    total,
  } = booking;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-base font-semibold text-dark">Booking Summary</h3>
      </div>

      <div className="p-5 space-y-4">
        {title && (
          <div className="flex items-center gap-3">
            <Tag className="w-4 h-4 text-muted" />
            <div>
              <p className="text-sm font-medium text-dark">{title}</p>
            </div>
          </div>
        )}

        {dates && (
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted" />
            <p className="text-sm text-dark">{dates}</p>
          </div>
        )}

        {guests && (
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-muted" />
            <p className="text-sm text-dark">{guests}</p>
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <div className="bg-light rounded-xl p-4 space-y-3">
          {items?.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-muted">{item.label}</span>
              <span className="text-sm font-medium text-dark">
                ₹{item.amount?.toLocaleString()}
              </span>
            </div>
          ))}

          {safetyFee !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                Safety Package
              </span>
              <span className="text-sm font-medium text-dark">
                ₹{safetyFee?.toLocaleString()}
              </span>
            </div>
          )}

          {discount !== undefined && discount > 0 && (
            <div className="flex items-center justify-between text-success">
              <span className="text-sm">Discount</span>
              <span className="text-sm font-medium">
                -₹{discount?.toLocaleString()}
              </span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
            <span className="text-base font-semibold text-dark">Total</span>
            <span className="text-xl font-bold text-navy">
              ₹{total?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <button className="w-full py-3 bg-orange text-white text-sm font-semibold rounded-xl hover:bg-orange/90 transition-colors">
          Confirm Booking
        </button>
        <p className="text-center text-[11px] text-muted mt-3">
          Free cancellation up to 48 hours before check-in
        </p>
      </div>
    </div>
  );
}
