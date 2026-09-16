import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, ExternalLink, Calendar, UserCheck } from 'lucide-react';
import { Project } from '../../types';
import { Modal } from '../common/Modal';
import { ImageUploader } from '../common/ImageUploader';

export const AdminProjects: React.FC = () => {
  const { language, t, projects, addProject, updateProject, deleteProject, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descAr, setDescAr] = useState('');
  const [category, setCategory] = useState('Websites');
  const [categoryAr, setCategoryAr] = useState('مواقع إلكترونية');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2025');
  const [projectUrl, setProjectUrl] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  const categories = [
    { en: 'Websites', ar: 'مواقع إلكترونية' },
    { en: 'Mobile Apps', ar: 'تطبيقات الموبايل' },
    { en: 'UI/UX', ar: 'تصميم UI/UX' },
    { en: 'Software', ar: 'أنظمة وبرمجيات' },
    { en: 'Platforms', ar: 'المنصات الرقمية' },
  ];

  const openCreateModal = () => {
    setEditingProject(null);
    setTitleEn('');
    setTitleAr('');
    setDescEn('');
    setDescAr('');
    setCategory('Websites');
    setCategoryAr('مواقع إلكترونية');
    setClient('');
    setYear(new Date().getFullYear().toString());
    setProjectUrl('https://devropix.com');
    setMainImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop');
    setTechnologies('React, TypeScript, Tailwind, Node.js');
    setFeatured(true);
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitleEn(p.title_en);
    setTitleAr(p.title_ar);
    setDescEn(p.description_en);
    setDescAr(p.description_ar);
    setCategory(p.category);
    setCategoryAr(p.category_ar);
    setClient(p.client);
    setYear(p.year);
    setProjectUrl(p.project_url || '');
    setMainImage(p.main_image);
    setTechnologies(p.technologies.join(', '));
    setFeatured(p.featured);
    setPublished(p.published);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingProject) {
      updateProject(editingProject.id, {
        title_en: titleEn,
        title_ar: titleAr,
        description_en: descEn,
        description_ar: descAr,
        category,
        category_ar: categoryAr,
        client,
        year,
        project_url: projectUrl,
        main_image: mainImage,
        gallery: [mainImage],
        technologies: techArray,
        featured,
        published,
      });
      addToast('success', language === 'ar' ? 'تم تحديث المشروع' : 'Project Updated', language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Changes saved successfully');
    } else {
      addProject({
        title_en: titleEn,
        title_ar: titleAr,
        description_en: descEn,
        description_ar: descAr,
        category,
        category_ar: categoryAr,
        client,
        year,
        project_url: projectUrl,
        main_image: mainImage,
        gallery: [mainImage],
        technologies: techArray,
        featured,
        published,
      });
      addToast('success', language === 'ar' ? 'تمت إضافة المشروع' : 'Project Created', language === 'ar' ? 'تمت إضافة المشروع الجديد بنجاح' : 'New project added to portfolio');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف مشروع "${name}"؟` : `Are you sure you want to delete project "${name}"?`)) {
      deleteProject(id);
      addToast('info', language === 'ar' ? 'تم الحذف' : 'Project Deleted', language === 'ar' ? 'تم حذف المشروع من المعرض' : 'Project removed');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.projects}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'إدارة معرض الأعمال والمشاريع المنفذة' : 'Manage portfolio projects, case studies and deliverables'}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.admin.newProject}</span>
        </button>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">{language === 'ar' ? 'المشروع' : 'Project'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'التصنيف والعميل' : 'Category & Client'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'التقنيات' : 'Tech Stack'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'مميز' : 'Featured'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-6 py-3.5 text-end">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={proj.main_image} alt={proj.title_en} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">{proj.title_en}</div>
                        <div className="text-[11px] text-slate-500">{proj.title_ar}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{proj.client} ({proj.year})</div>
                    <div className="text-[11px] text-indigo-600 font-medium">{proj.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {proj.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{proj.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateProject(proj.id, { featured: !proj.featured })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        proj.featured ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${proj.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span>{proj.featured ? (language === 'ar' ? 'مميز' : 'Featured') : (language === 'ar' ? 'عادي' : 'Standard')}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateProject(proj.id, { published: !proj.published })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        proj.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {proj.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{proj.published ? (language === 'ar' ? 'منشور' : 'Live') : (language === 'ar' ? 'مسودة' : 'Draft')}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title={t.admin.edit}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title_en)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title={t.admin.delete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? (language === 'ar' ? 'تعديل بيانات المشروع' : 'Edit Project') : t.admin.newProject}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Title (English) *
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. SallaPay Gateway"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                عنوان المشروع (عربي) *
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: بوابة دفع سلة العالمية"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client / Company *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Fintech Saudi / Tabby"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Delivery Year *
              </label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const matched = categories.find((c) => c.en === e.target.value);
                  if (matched) setCategoryAr(matched.ar);
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
              >
                {categories.map((c) => (
                  <option key={c.en} value={c.en}>{c.en} ({c.ar})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Live URL / Demo Link
              </label>
              <input
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <ImageUploader
              label="Main Project Cover / Mockup"
              value={mainImage}
              onChange={(url) => setMainImage(url)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description (English) *
              </label>
              <textarea
                required
                rows={3}
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                الوصف وقصة النجاح (عربي) *
              </label>
              <textarea
                required
                rows={3}
                value={descAr}
                onChange={(e) => setDescAr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, Next.js, Node.js, PostgreSQL"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>{language === 'ar' ? 'مشروع مميز (يظهر في الواجهة الرئيسية)' : 'Featured on Home Page'}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>{language === 'ar' ? 'نشر المشروع فوراً' : 'Publish Live'}</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              {t.admin.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs"
            >
              {t.admin.save}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
