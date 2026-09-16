import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  Smartphone, 
  Layout, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Check, 
  ArrowUpRight, 
  ChevronDown, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Service } from '../../types';

export const ServicesPage: React.FC = () => {
  const { language, t, services, setSelectedService, setCurrentView } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Layout': return <Layout className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const published = services
    .filter((s) => s.published)
    .sort((a, b) => a.sort_order - b.sort_order);

  const faqs = [
    {
      q_en: 'How does DevRopix structure project pricing and timelines?',
      q_ar: 'كيف تحدد DevRopix أسعار المشاريع والجداول الزمنية للتنفيذ؟',
      a_en: 'We offer two flexible models: Fixed-Scope Milestones (ideal for clearly defined products with guaranteed delivery dates) and Dedicated Engineering Squads (retained monthly squads for continuous product iteration). Most MVPs are delivered in 4 to 8 weeks.',
      a_ar: 'نوفر نموذجين مرنين: المشاريع المحددة المخرجات (Fixed-Scope) بمواعيد تسليم مضمونة، أو فرق التطوير المخصصة (Dedicated Squads) بنظام الاشتراك الشهري للمنتجات المتنامية. معظم النسخ الأولية (MVPs) يتم تسليمها خلال 4 إلى 8 أسابيع.',
    },
    {
      q_en: 'Do you build native mobile apps or cross-platform Flutter/React Native?',
      q_ar: 'هل تطورون تطبيقات هواتف أصلية أم هجينة (Flutter / React Native)؟',
      a_en: 'We specialize in both. For 85% of businesses, Flutter and React Native provide native 60fps performance with half the engineering cost and unified maintenance. For specialized hardware or heavy ML on-device, our native Swift and Kotlin teams execute custom modules.',
      a_ar: 'نحن متخصصون في كلا المسارين. بالنسبة لـ 85% من الأعمال، توفر فلاتر ورياكت نيتف أداء أصلي 60fps بنصف تكلفة الصيانة البرمجية. وللمشاريع التي تتطلب معالجة عتادية خاصة أو ذكاء اصطناعي مكثف على الجهاز، يتولى فريق Swift وKotlin التطوير الأصلي.',
    },
    {
      q_en: 'Who owns the intellectual property (IP) and source code?',
      q_ar: 'من يمتلك حقوق الملكية الفكرية والشفرة المصدرية (Source Code)؟',
      a_en: 'You own 100% of all code, architecture documents, Figma design files, and database schemas from day one. All repositories are maintained in your private enterprise accounts.',
      a_ar: 'يمتلك العميل 100% من الشفرة المصدرية، ملفات تصميم Figma، وهياكل قواعد البيانات من اليوم الأول. يتم تسليم كافة المستودعات (Git Repositories) على حسابات مؤسستك الخاصة.',
    },
    {
      q_en: 'Do you provide SLA-backed maintenance after product launch?',
      q_ar: 'هل تقدمون خدمات الصيانة والدعم الفني بعد إطلاق المنتج؟',
      a_en: 'Yes. Every project includes a 60-day warranty period followed by optional continuous SLA retainers covering 24/7 telemetry monitoring, automated security patches, cloud cost optimization, and new feature sprints.',
      a_ar: 'نعم. يتضمن كل مشروع فترة ضمان تشغيلي لمدة 60 يوماً، تليها عقود صيانة ودعم فني (SLA) تشمل مراقبة الأعطال اللحظية 24/7، سد الثغرات الأمنية، وتحسين تكاليف الاستضافة السحابية.',
    }
  ];

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
            <span>{t.services.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.services.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Detailed Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {published.map((srv) => {
            const title = language === 'ar' ? srv.title_ar : srv.title_en;
            const desc = language === 'ar' ? srv.description_ar : srv.description_en;
            const features = language === 'ar' ? srv.features_ar : srv.features_en;

            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-2xs">
                    {getServiceIcon(srv.icon)}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                    <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                      {t.services.featuresTitle}:
                    </div>
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech & CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {srv.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-mono font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedService(srv);
                      setCurrentView('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>{t.services.requestQuote}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Ecosystem Matrix */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-2xs text-start">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              {language === 'ar' ? 'منظومة التقنيات المعتمدة في DevRopix' : 'Our Enterprise Technology Matrix'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'ar' 
                ? 'نعتمد فقط على أحدث التقنيات المختبرة ذات الأداء الفائق والأمان المعتمد عالمياً.'
                : 'We strictly adopt battle-tested, high-throughput technologies with strong typing and active security ecosystems.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'React 19 & Next.js', tag: 'Web Engine' },
              { name: 'TypeScript', tag: 'Type Safety' },
              { name: 'Node.js & Go', tag: 'Microservices' },
              { name: 'Flutter & Kotlin', tag: 'Mobile 60fps' },
              { name: 'PostgreSQL & Redis', tag: 'High-Scale DB' },
              { name: 'AWS & Docker', tag: 'Cloud DevOps' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-xs font-bold text-slate-900 mb-1">{item.name}</div>
                <div className="text-[11px] font-mono text-indigo-600">{item.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6 text-start">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wider uppercase mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {language === 'ar' ? 'الأسئلة الشائعة حول خدماتنا' : 'Frequently Asked Questions'}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const q = language === 'ar' ? faq.q_ar : faq.q_en;
              const a = language === 'ar' ? faq.a_ar : faq.a_en;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-start flex items-center justify-between font-bold text-slate-900 hover:text-indigo-600 text-sm sm:text-base gap-4"
                  >
                    <span>{q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
