import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ExternalLink, Calendar, UserCheck } from 'lucide-react';
import { Project } from '../../types';

export const FeaturedProjects: React.FC = () => {
  const { language, t, projects, setSelectedProject, setCurrentView } = useApp();

  const featuredProjects = projects
    .filter((p) => p.published && p.featured)
    .slice(0, 4);

  const handleOpenProject = (proj: Project) => {
    setSelectedProject(proj);
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
              <span>{t.projects.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.projects.title}
            </h2>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl shadow-2xs transition-all self-start md:self-end"
          >
            <span>{language === 'ar' ? 'جميع المشاريع' : 'View All Projects'}</span>
            <ArrowUpRight className="w-4 h-4 rtl:rotate-270 text-indigo-600" />
          </button>
        </div>

        {/* Alternating Featured Projects Showcase */}
        <div className="space-y-12 sm:space-y-16">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 1;
            const title = language === 'ar' ? project.title_ar : project.title_en;
            const desc = language === 'ar' ? project.description_ar : project.description_en;
            const category = language === 'ar' ? project.category_ar : project.category;

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column (7 cols) */}
                  <div className={`lg:col-span-7 relative overflow-hidden bg-slate-100 h-72 sm:h-96 lg:h-[440px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <img
                      src={project.main_image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 start-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-slate-800 shadow-xs">
                      {category}
                    </div>
                  </div>

                  {/* Text Details Column (5 cols) */}
                  <div className={`lg:col-span-5 p-8 sm:p-10 lg:p-12 text-start flex flex-col justify-between ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      {/* Meta badges */}
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{project.client}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{project.year}</span>
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4 group-hover:text-indigo-600 transition-colors">
                        {title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                        {desc}
                      </p>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                      <button
                        onClick={() => handleOpenProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all"
                      >
                        <span>{t.projects.viewProject}</span>
                        <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
                      </button>

                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                          <span>{t.projects.liveDemo}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
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
