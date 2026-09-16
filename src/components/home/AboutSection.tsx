import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Award, CheckCircle, Sparkles, Target, Zap } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, t, settings, setCurrentView } = useApp();

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition with Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                alt="DevRopix Engineering Team"
                className="w-full h-96 sm:h-[460px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 start-6 end-6 text-white text-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/80 backdrop-blur-md text-xs font-semibold mb-2">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  <span>Cairo & Riyadh Engineering Squads</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold tracking-tight">
                  {language === 'ar' ? 'فريق من نخبة مهندسي البرمجيات ومصممي المنتجات' : 'Senior Product Engineers, Architects & UX Designers'}
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -end-4 sm:-end-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xl text-start z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-xl">
                  {settings.stats_years}+
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {language === 'ar' ? 'سنوات من التميز' : 'Years of Excellence'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {language === 'ar' ? 'في أسواق الشرق الأوسط والخليج' : 'In MENA & GCC Tech Markets'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Mission, Values */}
          <div className="lg:col-span-6 space-y-6 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
              <span>{t.about.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base text-slate-700 font-medium leading-relaxed">
              {t.about.lead}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {t.about.p1}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                  <Target className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{t.about.missionTitle}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.about.missionDesc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                  <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{t.about.visionTitle}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.about.visionDesc}
                </p>
              </div>
            </div>

            {/* Values Pills */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                {t.about.valuesTitle}
              </div>
              <div className="flex flex-wrap gap-2">
                {t.about.values.map((val) => (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-slate-700 text-xs font-semibold"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{val}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Link to About Page */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <span>{language === 'ar' ? 'تعرف على قصة DevRopix وفريقنا' : 'Read Our Full Studio Story'}</span>
                <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
