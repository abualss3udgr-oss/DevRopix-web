import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { language, t, setCurrentView, settings } = useApp();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-[#36366F] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl text-start">
          
          {/* Subtle Ambient Shapes */}
          <div className="absolute -end-16 -top-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -start-16 -bottom-16 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-cyan-200 text-xs font-semibold tracking-wide border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.cta.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {t.cta.title}
            </h2>

            <p className="text-base sm:text-lg text-indigo-100 leading-relaxed max-w-2xl font-normal">
              {t.cta.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setCurrentView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 hover:bg-slate-100 font-bold rounded-xl text-sm shadow-md transition-all active:scale-98"
              >
                <span>{t.cta.buttonPrimary}</span>
                <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl text-sm backdrop-blur-xs transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.cta.buttonSecondary}</span>
              </button>
            </div>

            {/* Direct Phone / WhatsApp teaser */}
            <div className="pt-6 border-t border-white/15 text-xs text-indigo-200 flex flex-wrap items-center gap-2">
              <span>{t.cta.orCall}</span>
              <a
                href={`tel:${settings.phone}`}
                className="font-bold text-white hover:underline dir-ltr"
              >
                {settings.phone}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
