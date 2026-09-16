import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Code2, 
  Smartphone, 
  ShieldCheck, 
  MessageSquare, 
  Handshake, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export const WhyDevRopix: React.FC = () => {
  const { language, t } = useApp();
  const [activePreview, setActivePreview] = useState<'rtl' | 'ltr'>('rtl');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
            <span>{t.why.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.why.title}
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            {t.why.subtitle}
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1 (Large - 7 Cols): Business-Focused Solutions with Live Metric Visualization */}
          <div className="md:col-span-7 bg-[#FAFAFD] rounded-3xl p-8 border border-slate-200/80 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-sm shadow-indigo-600/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                {t.why.item1Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                {t.why.item1Desc}
              </p>
            </div>

            {/* Visual ROI Metric Board */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Conversion Lift</div>
                <div className="text-xl font-extrabold text-indigo-600 mt-1">+142%</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Time-to-Market</div>
                <div className="text-xl font-extrabold text-slate-900 mt-1">4.5 Wks</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Core Web Vitals</div>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">98/100</div>
              </div>
            </div>
          </div>

          {/* Card 2 (5 Cols): Modern Tech Stack */}
          <div className="md:col-span-5 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center mb-5">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                {t.why.item2Title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.why.item2Desc}
              </p>
            </div>

            {/* Interactive Tech Pills */}
            <div className="mt-8 pt-4 flex flex-wrap gap-2">
              {['TypeScript', 'React 19', 'Next.js', 'Flutter', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3 (4 Cols): Bi-Directional UI/UX with Live Preview Toggle */}
          <div className="md:col-span-4 bg-[#FAFAFD] rounded-3xl p-7 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                {/* Mini toggle */}
                <div className="flex bg-slate-200 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setActivePreview('rtl')}
                    className={`px-2 py-1 rounded-md transition-all ${
                      activePreview === 'rtl' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    AR (RTL)
                  </button>
                  <button
                    onClick={() => setActivePreview('ltr')}
                    className={`px-2 py-1 rounded-md transition-all ${
                      activePreview === 'ltr' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    EN (LTR)
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                {t.why.item3Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {t.why.item3Desc}
              </p>
            </div>

            {/* Mini Simulated UI Screen */}
            <div
              dir={activePreview}
              className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-2 font-sans transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">
                  {activePreview === 'rtl' ? 'الرصيد المتاح' : 'Available Balance'}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  {activePreview === 'rtl' ? 'نشط' : 'Active'}
                </span>
              </div>
              <div className="text-base font-extrabold text-indigo-600">
                {activePreview === 'rtl' ? '٤٨,٥٠٠ ر.س' : '$12,940.00'}
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-3/4" />
              </div>
            </div>
          </div>

          {/* Card 4 (4 Cols): Scalable Cloud Architecture */}
          <div className="md:col-span-4 bg-[#FAFAFD] rounded-3xl p-7 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                {t.why.item4Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {t.why.item4Desc}
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero-downtime Continuous Deployment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated Database Replicas & Failover</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DDoS Mitigation & SOC2-ready Encryption</span>
              </li>
            </ul>
          </div>

          {/* Card 5 (4 Cols): Transparent Communication & Partnership */}
          <div className="md:col-span-4 bg-[#FAFAFD] rounded-3xl p-7 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                {t.why.item5Title} & {t.why.item6Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.why.item5Desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5 text-indigo-600">
                <Sparkles className="w-4 h-4" />
                <span>Senior Engineers Only</span>
              </span>
              <span className="text-slate-500">100% In-house</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
