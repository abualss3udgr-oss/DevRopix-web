import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { language, t, testimonials } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const published = testimonials.filter((item) => item.published);

  if (published.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? published.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === published.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
              <span>{t.testimonials.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {published.map((item, idx) => {
            const content = language === 'ar' ? item.content_ar : item.content_en;

            return (
              <div
                key={item.id}
                className="bg-[#F8FAFC] rounded-2xl p-8 border border-slate-200/90 flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 transition-all duration-300 relative group"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-indigo-200 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  {/* Feedback Text */}
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-8 text-start font-normal">
                    "{content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60 text-start">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      {item.name}
                    </h4>
                    <div className="text-xs text-slate-500 font-medium">
                      {item.position} • <span className="text-indigo-600 font-semibold">{item.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
