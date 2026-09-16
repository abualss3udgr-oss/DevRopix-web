import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Map, 
  Palette, 
  Terminal, 
  Rocket, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { language, t } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      key: 'step1',
      icon: <Compass className="w-5 h-5" />,
      title: t.process.step1Title,
      desc: t.process.step1Desc,
      deliverables: language === 'ar' 
        ? ['ورشة عمل استكشافية', 'تحليل المنافسين وسلوك المستخدم', 'وثيقة المتطلبات الفنية (PRD)']
        : ['Discovery workshops', 'Competitor & user journey audit', 'Technical requirements doc (PRD)'],
    },
    {
      num: '02',
      key: 'step2',
      icon: <Map className="w-5 h-5" />,
      title: t.process.step2Title,
      desc: t.process.step2Desc,
      deliverables: language === 'ar'
        ? ['مخطط هيكل قاعدة البيانات', 'مواصفات واجهات REST & GraphQL', 'خريطة البنية السحابية AWS/GCP']
        : ['Database schema diagram', 'API contract specifications', 'Cloud infrastructure map'],
    },
    {
      num: '03',
      key: 'step3',
      icon: <Palette className="w-5 h-5" />,
      title: t.process.step3Title,
      desc: t.process.step3Desc,
      deliverables: language === 'ar'
        ? ['نظام تصميم متكامل على Figma', 'نماذج تفاعلية عالية الدقة', 'مراجعة ثنائية الاتجاه RTL / LTR']
        : ['Figma design system & tokens', 'Interactive clickable prototype', 'Bi-directional RTL/LTR review'],
    },
    {
      num: '04',
      key: 'step4',
      icon: <Terminal className="w-5 h-5" />,
      title: t.process.step4Title,
      desc: t.process.step4Desc,
      deliverables: language === 'ar'
        ? ['تطوير رشيق عبر سبرنتات أسبوعية', 'فحص آلي للكود واختبارات الوحدة', 'بيئة معاينة تجريبية مستمرة']
        : ['Weekly Agile sprints', 'Unit & automated integration tests', 'Continuous staging preview builds'],
    },
    {
      num: '05',
      key: 'step5',
      icon: <Rocket className="w-5 h-5" />,
      title: t.process.step5Title,
      desc: t.process.step5Desc,
      deliverables: language === 'ar'
        ? ['اختبارات ضغط وتحمل الخوادم', 'تدقيق أمني شامل واختبار اختراق', 'تدشين سحابي بانعدام التوقف']
        : ['Stress & load benchmark testing', 'Security & penetration audit', 'Zero-downtime production deployment'],
    },
    {
      num: '06',
      key: 'step6',
      icon: <HeartHandshake className="w-5 h-5" />,
      title: t.process.step6Title,
      desc: t.process.step6Desc,
      deliverables: language === 'ar'
        ? ['مراقبة استباقية 24/7 للأعطال', 'اتفاقية مستوى خدمة SLA معتمدة', 'تطوير وتحديث دوري للميزات']
        : ['24/7 proactive telemetry monitoring', 'SLA-backed emergency support', 'Continuous feature iteration roadmap'],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
            <span>{t.process.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.process.title}
          </h2>
          <p className="text-base text-slate-600 mt-2 leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* Visual Timeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const isHighlighted = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-7 border transition-all duration-300 text-start relative flex flex-col justify-between ${
                  isHighlighted
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.02]'
                    : 'bg-[#F8FAFC] text-slate-900 border-slate-200/90 hover:border-indigo-300 hover:bg-white'
                }`}
              >
                <div>
                  {/* Step number badge & icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isHighlighted ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-slate-200 shadow-2xs'
                    }`}>
                      {step.icon}
                    </div>

                    <span className={`text-sm font-mono font-bold ${
                      isHighlighted ? 'text-indigo-400' : 'text-slate-400'
                    }`}>
                      {step.num}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold mb-2.5 ${
                    isHighlighted ? 'text-white' : 'text-slate-900'
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isHighlighted ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {step.desc}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className={`pt-4 border-t ${
                  isHighlighted ? 'border-slate-800' : 'border-slate-200/60'
                }`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 ${
                    isHighlighted ? 'text-indigo-400' : 'text-slate-400'
                  }`}>
                    {language === 'ar' ? 'المخرجات الرئيسية' : 'Key Deliverables'}
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                          isHighlighted ? 'text-emerald-400' : 'text-indigo-600'
                        }`} />
                        <span className={isHighlighted ? 'text-slate-200' : 'text-slate-700'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
