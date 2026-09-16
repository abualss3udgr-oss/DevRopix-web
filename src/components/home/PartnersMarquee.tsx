import React from 'react';
import { useApp } from '../../context/AppContext';

export const PartnersMarquee: React.FC = () => {
  const { t, partners } = useApp();

  const activePartners = partners.filter((p) => p.active);

  if (activePartners.length === 0) return null;

  // Duplicate for seamless infinite loop
  const displayPartners = [...activePartners, ...activePartners];

  return (
    <section className="py-10 border-y border-slate-200/80 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          {t.trust.tag}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute top-0 start-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 end-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee items-center gap-12 sm:gap-16">
          {displayPartners.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex items-center gap-2.5 shrink-0 px-4 py-2 rounded-xl group transition-all duration-300"
            >
              {/* Partner Logo / Wordmark Pill */}
              <div className="flex items-center gap-2 text-slate-400 group-hover:text-indigo-600 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-50 border border-slate-200 group-hover:border-indigo-200 flex items-center justify-center font-bold text-xs uppercase tracking-wider transition-colors">
                  {partner.name.substring(0, 2)}
                </div>
                <span className="text-sm font-semibold tracking-tight text-slate-500 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
