import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[560px] sm:h-[620px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80"
          alt="Scenic mountain landscape at sunrise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/30 to-navy/80" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl pt-6">
          <div className="inline-flex items-center gap-2 bg-white/90 text-navy backdrop-blur-md rounded-full pl-2 pr-4 py-1.5 mb-6 shadow-lg">
            <span className="bg-orange text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              NEW
            </span>
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span className="text-xs font-semibold">AI-Powered Smart Tourism Assistant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-4 drop-shadow-lg">
            Travel Smarter.
            <br />
            Explore Safer.
          </h1>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-0 max-w-xl">
            Plan trips, stay safe, avoid crowds, and adapt to weather — all in one smart, context-aware travel experience.
          </p>
        </div>
      </div>
    </section>
  );
}
