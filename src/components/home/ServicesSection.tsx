import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  Smartphone, 
  Layout, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles,
  Check
} from 'lucide-react';
import { Service } from '../../types';

export const ServicesSection: React.FC = () => {
  const { language, t, services, setSelectedService, setCurrentView } = useApp();

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

  const publishedServices = services
    .filter((s) => s.published)
    .sort((a, b) => a.sort_order - b.sort_order);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setCurrentView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
            <span>{t.services.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {publishedServices.map((service) => {
            const title = language === 'ar' ? service.title_ar : service.title_en;
            const desc = language === 'ar' ? service.description_ar : service.description_en;
            const features = language === 'ar' ? service.features_ar : service.features_en;

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Hover Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      0{service.sort_order}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-indigo-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {desc}
                  </p>

                  {/* Capabilities checklist */}
                  {features && features.length > 0 && (
                    <ul className="space-y-2 mb-6 text-xs text-slate-600">
                      {features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer of Card: Tech pills & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {service.technologies.slice(0, 2).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 2 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{service.technologies.length - 2}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleServiceClick(service)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 hover:underline"
                  >
                    <span>{t.services.learnMore}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setCurrentView('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl shadow-2xs hover:border-indigo-400 transition-all"
          >
            <span>{t.services.viewAll}</span>
            <ArrowUpRight className="w-4 h-4 rtl:rotate-270 text-indigo-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
