import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Target, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Code, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t, settings, setCurrentView } = useApp();

  const team = [
    {
      name: language === 'ar' ? 'م. كريم شريف' : 'Karim Sherif',
      role: language === 'ar' ? 'المؤسس ورئيس التكنولوجيا' : 'Founder & Chief Architect',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      bio: language === 'ar' ? 'أكثر من 10 سنوات في قيادة البنى البرمجية السحابية والأنظمة الموزعة.' : '10+ years architecting distributed cloud systems and high-throughput backends.',
    },
    {
      name: language === 'ar' ? 'سارة المنصوري' : 'Sarah Al-Mansouri',
      role: language === 'ar' ? 'مديرة تصميم المنتجات وUI/UX' : 'Head of Product Design & UX',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
      bio: language === 'ar' ? 'خبيرة في بناء أنظمة التصميم الثنائية (RTL/LTR) وسيكولوجية تفاعل المستخدم.' : 'Specialized in bi-directional design tokens, micro-interactions, and conversion design.',
    },
    {
      name: language === 'ar' ? 'أحمد عبد العزيز' : 'Ahmed Abdelaziz',
      role: language === 'ar' ? 'قائد مهندسي الويب والواجهات' : 'Staff Frontend Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      bio: language === 'ar' ? 'متخصص في React 19، تحسين مقاييس Core Web Vitals ومحركات السيرفر Next.js.' : 'Expert in Next.js Server Components, bundle optimization, and 99+ Core Web Vitals.',
    },
    {
      name: language === 'ar' ? 'عمر القحطاني' : 'Omar Al-Qahtani',
      role: language === 'ar' ? 'قائد تطوير تطبيقات الموبايل' : 'Principal Mobile Architect',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      bio: language === 'ar' ? 'قاد تطوير أكثر من 20 تطبيق على متاجر iOS وAndroid بتقنيات Flutter وNative.' : 'Delivered 20+ top-ranking App Store & Play Store products using Flutter and native engines.',
    },
  ];

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
            <span>{t.about.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.about.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.about.subtitle}
          </p>
        </div>

        {/* Narrative & Inception */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-start">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {language === 'ar' ? 'بدأنا بهدف واضح: إنهاء عصر البرمجيات البطيئة والرديئة' : 'Founded With a Mission: Eliminating Sluggish, Fragile Software'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.about.p1}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {language === 'ar'
                ? 'اليوم، تدير DevRopix مقرات هندسية متكاملة لخدمة الشركات الناشئة سريعة النمو والمؤسسات الكبرى في مصر، المملكة العربية السعودية، والإمارات العربية المتحدة.'
                : 'Today, DevRopix operates high-velocity product engineering squads serving fast-growing startups and enterprises across Egypt, Saudi Arabia, and the United Arab Emirates.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-extrabold text-indigo-600">{settings.stats_projects}+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">{t.stats.projectsDone}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-extrabold text-slate-900">{settings.stats_clients}+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">{t.stats.happyClients}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
                alt="DevRopix Design & Code Lab"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission, Vision, and Engineering Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.about.missionTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.missionDesc}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.about.visionTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.visionDesc}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {language === 'ar' ? 'فلسفة الكود النظيف' : 'Zero Technical Debt'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'ar'
                ? 'لا نكتب كوداً عشوائياً. نلتزم بأعلى معايير SOLID، واختبارات الأمان الآلية، والتوثيق المرجعي الشامل لكل مسار.'
                : 'Strict SOLID architecture, 100% type safety, automated regression suites, and clear API documentation.'}
            </p>
          </div>
        </div>

        {/* Leadership Team Showcase */}
        <div className="space-y-8 text-start">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الفريق القيادي' : 'Core Squad'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ar' ? 'مهندسون ومصممون يكرسون وقتهم لنجاح منتجك' : 'Senior Craftsmen Behind Every Shipped Product'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs p-5">
                <div className="h-56 rounded-xl overflow-hidden bg-slate-100 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                <div className="text-xs font-semibold text-indigo-600 mt-0.5 mb-2">{member.role}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Hubs */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 text-start">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              {language === 'ar' ? 'مراكز الابتكار الإقليمية' : 'Regional Innovation Hubs'}
            </h3>
            <p className="text-sm text-slate-300">
              {language === 'ar'
                ? 'فريق متواجد محلياً في القاهرة والرياض لدعم شركائنا في الشرق الأوسط.'
                : 'On-the-ground engineering hubs in Cairo & Riyadh ensuring local market context and zero time-zone friction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span>Cairo Engineering Hub</span>
              </div>
              <p className="text-xs text-slate-400">Smart Village, Building B14, Giza, Greater Cairo</p>
              <div className="mt-3 text-xs text-indigo-300 font-mono">Core Backend & Mobile Labs</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span>Riyadh Commercial Hub</span>
              </div>
              <p className="text-xs text-slate-400">King Fahd Road, Al Olaya District, Riyadh, Saudi Arabia</p>
              <div className="mt-3 text-xs text-indigo-300 font-mono">GCC Client Success & Architecture</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
