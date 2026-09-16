import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { ExternalLink, Calendar, UserCheck, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { language, t, selectedProject, setSelectedProject, setCurrentView } = useApp();

  if (!selectedProject) return null;

  const title = language === 'ar' ? selectedProject.title_ar : selectedProject.title_en;
  const desc = language === 'ar' ? selectedProject.description_ar : selectedProject.description_en;
  const category = language === 'ar' ? selectedProject.category_ar : selectedProject.category;

  const handleInquire = () => {
    setSelectedProject(null);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Modal
      isOpen={!!selectedProject}
      onClose={() => setSelectedProject(null)}
      maxWidth="4xl"
    >
      <div className="space-y-6 text-start">
        {/* Main Cover Image */}
        <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-slate-100 border border-slate-200">
          <img
            src={selectedProject.main_image}
            alt={title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 shadow-sm">
            {category}
          </div>
        </div>

        {/* Header & Meta */}
        <div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-2">
            <span className="flex items-center gap-1.5 text-slate-700">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>{selectedProject.client}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{selectedProject.year}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Narrative & Case Study Description */}
        <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed">
          <p>{desc}</p>
        </div>

        {/* Technologies Grid */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>{t.services.techStack}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-mono font-medium shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Gallery if present */}
        {selectedProject.gallery && selectedProject.gallery.length > 1 && (
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {language === 'ar' ? 'معرض صور المشروع' : 'Product Gallery'}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {selectedProject.gallery.slice(1).map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden h-36 bg-slate-100 border border-slate-200">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          {selectedProject.project_url ? (
            <a
              href={selectedProject.project_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              <span>{t.projects.liveDemo}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              {t.projects.closeModal}
            </button>
            <button
              onClick={handleInquire}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
            >
              <span>{language === 'ar' ? 'طلب مشروع مشابه' : 'Build Similar Product'}</span>
              <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
