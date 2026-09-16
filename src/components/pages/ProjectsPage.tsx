import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ArrowUpRight, Calendar, UserCheck, Filter } from 'lucide-react';
import { Project } from '../../types';

export const ProjectsPage: React.FC = () => {
  const { language, t, projects, setSelectedProject } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { key: 'All', label_en: 'All Projects', label_ar: 'كل المشاريع' },
    { key: 'Websites', label_en: 'Websites', label_ar: 'مواقع إلكترونية' },
    { key: 'Mobile Apps', label_en: 'Mobile Apps', label_ar: 'تطبيقات الموبايل' },
    { key: 'UI/UX', label_en: 'UI/UX Design', label_ar: 'تصميم UI/UX' },
    { key: 'Software', label_en: 'Software Systems', label_ar: 'أنظمة وبرمجيات' },
    { key: 'Platforms', label_en: 'Digital Platforms', label_ar: 'المنصات الرقمية' },
  ];

  const filteredProjects = projects
    .filter((p) => p.published)
    .filter((p) => {
      if (selectedCategory === 'All') return true;
      return p.category === selectedCategory;
    })
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = p.title_en.toLowerCase().includes(q) || p.title_ar.toLowerCase().includes(q);
      const descMatch = p.description_en.toLowerCase().includes(q) || p.description_ar.toLowerCase().includes(q);
      const techMatch = p.technologies.some((tech) => tech.toLowerCase().includes(q));
      const clientMatch = p.client.toLowerCase().includes(q);
      return titleMatch || descMatch || techMatch || clientMatch;
    });

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
            <span>{t.projects.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.projects.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const label = language === 'ar' ? cat.label_ar : cat.label_en;

              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث باسم المشروع أو التقنية...' : 'Search by title, tech, client...'}
              className="w-full ps-9 pe-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {language === 'ar' ? 'لم يتم العثور على مشاريع تطابق البحث' : 'No projects found matching your criteria'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'ar' ? 'جرّب تغيير التصنيف أو كلمة البحث.' : 'Try changing your category filter or search keywords.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const title = language === 'ar' ? project.title_ar : project.title_en;
              const desc = language === 'ar' ? project.description_ar : project.description_en;
              const category = language === 'ar' ? project.category_ar : project.category;

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Project Thumbnail */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
                      <img
                        src={project.main_image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 shadow-2xs">
                        {category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 text-start">
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{project.client}</span>
                        </span>
                        <span>•</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2.5 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                        {desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>{t.projects.viewProject}</span>
                    <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
