import { CheckCircle } from 'lucide-react';

export default function PlannerStepper({ steps, current }) {
  return (
    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2" role="tablist" aria-label="Planner progress">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2" role="tab" aria-selected={i === current}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              i <= current ? 'bg-blue text-white' : 'bg-gray-200 text-muted'
            }`}
          >
            {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-sm font-medium whitespace-nowrap ${i <= current ? 'text-dark' : 'text-muted'}`}>
            {s}
          </span>
          {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200" />}
        </div>
      ))}
    </div>
  );
}