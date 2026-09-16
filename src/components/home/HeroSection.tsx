import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Activity, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Server 
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, t, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry' | 'code'>('architecture');

  return (
    <section className="relative overflow-hidden w-full min-h-[92vh] flex items-center pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28 bg-slate-950 text-white">
      {/* Background Image with Cinematic Overlays */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/hero-bg.jpg"
          alt="DevRopix Futuristic Landscape"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Layered cinematic overlays: high text legibility on content side, crystal clear vibrancy on visual side */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/50" />
        <div className="absolute inset-0 bg-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent rtl:bg-gradient-to-l rtl:from-slate-950/90 rtl:via-slate-950/50 rtl:to-transparent" />
        <div className="absolute top-0 end-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-black/20">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.14]">
              <span className="block text-white drop-shadow-sm">{t.hero.titleHighlight1}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-sky-300 mt-1">
                {t.hero.titleHighlight2}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl font-normal drop-shadow-xs">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  setCurrentView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/35 transition-all group border border-indigo-400/30"
              >
                <span>{t.hero.startProject}</span>
                <ArrowUpRight className="w-4 h-4 rtl:rotate-270 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 text-white font-semibold rounded-xl text-sm backdrop-blur-md shadow-lg transition-all hover:border-slate-500"
              >
                <span>{t.hero.exploreWork}</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-start">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">99.98%</div>
                <div className="text-xs text-slate-400 mt-0.5">{language === 'ar' ? 'استقرار السيرفرات' : 'Reliability Uptime'}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-indigo-400">&lt; 45ms</div>
                <div className="text-xs text-slate-400 mt-0.5">{language === 'ar' ? 'استجابة الـ API' : 'Global Latency'}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">48+</div>
                <div className="text-xs text-slate-400 mt-0.5">{language === 'ar' ? 'مشروع تم إطلاقه' : 'Shipped Products'}</div>
              </div>
            </div>
          </div>

          {/* Right Side: High-Craft Software Mockup & Interactive Studio Composition */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Shadow glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000 -z-10" />

            {/* Main Interactive Product Card */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              {/* Card Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ms-2 flex items-center gap-1">
                    <Server className="w-3 h-3 text-indigo-400" />
                    devropix-cloud-cluster // prod
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{t.hero.statusOperational}</span>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex border-b border-slate-800 bg-slate-900/90 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'architecture'
                      ? 'text-indigo-400 border-b-2 border-indigo-500 bg-slate-800/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'telemetry'
                      ? 'text-indigo-400 border-b-2 border-indigo-500 bg-slate-800/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Telemetry</span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'code'
                      ? 'text-indigo-400 border-b-2 border-indigo-500 bg-slate-800/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Stack.ts</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-5 font-mono text-xs space-y-4">
                {activeTab === 'architecture' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Edge API Gateway</div>
                          <div className="text-[10px] text-slate-400">Zero-coldstart Next.js & Go</div>
                        </div>
                      </div>
                      <span className="text-emerald-400 text-[11px] font-bold">28ms avg</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">PostgreSQL & Redis Cache</div>
                          <div className="text-[10px] text-slate-400">Encrypted at rest + automated backup</div>
                        </div>
                      </div>
                      <span className="text-indigo-400 text-[11px] font-bold">Encrypted</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Mobile Cross-Platform</div>
                          <div className="text-[10px] text-slate-400">Flutter 60fps Native engine</div>
                        </div>
                      </div>
                      <span className="text-cyan-400 text-[11px] font-bold">Active v2.4</span>
                    </div>
                  </div>
                )}

                {activeTab === 'telemetry' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Real-time Throughput:</span>
                      <span className="text-white font-bold">14,280 req / min</span>
                    </div>
                    {/* Simulated live visual sparkline bars */}
                    <div className="flex items-end gap-1.5 h-14 pt-2">
                      {[40, 65, 55, 78, 92, 85, 70, 95, 88, 100, 84, 96, 90, 80].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-xs transition-all duration-500 ${
                            i === 9 || i === 11 ? 'bg-indigo-500' : 'bg-slate-700 hover:bg-indigo-400'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                      <span>00:00 UTC</span>
                      <span>Peak Traffic Peak</span>
                      <span>Now</span>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="bg-slate-950 p-3 rounded-lg text-[11px] text-slate-300 leading-relaxed font-mono overflow-x-auto">
                    <p><span className="text-indigo-400">import</span> &#123; createEngine &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@devropix/core'</span>;</p>
                    <p className="mt-1"><span className="text-indigo-400">export const</span> app = createEngine(&#123;</p>
                    <p className="ms-3 text-slate-400">region: <span className="text-amber-300">'me-central1'</span>,</p>
                    <p className="ms-3 text-slate-400">architecture: <span className="text-amber-300">'cloud-native'</span>,</p>
                    <p className="ms-3 text-slate-400">sla: <span className="text-amber-300">'99.98%'</span>,</p>
                    <p className="ms-3 text-emerald-400">// Ready for 10M+ users</p>
                    <p>&#125;);</p>
                  </div>
                )}

                {/* Status Bar */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Continuous Delivery Enabled
                  </span>
                  <span className="text-slate-500">Node v22 / Vite 6 / React 19</span>
                </div>
              </div>
            </div>

            {/* Floating UI Badges */}
            <div className="hidden sm:flex absolute -bottom-5 -start-6 bg-slate-900/90 backdrop-blur-md text-white p-3.5 rounded-xl border border-slate-700/80 shadow-2xl items-center gap-3 z-10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {language === 'ar' ? 'كود عالي الجودة' : 'Enterprise Standards'}
                </div>
                <div className="text-[11px] text-slate-300">
                  {language === 'ar' ? 'اختبارات تلقائية وأمان معتمد' : 'Clean Architecture & Tested'}
                </div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-5 -end-4 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700/80 shadow-2xl items-center gap-2.5 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
              <div className="text-xs font-semibold text-slate-200">
                {language === 'ar' ? 'دعم LTR وRTL كامل' : 'Bi-Directional Arabic & English'}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
