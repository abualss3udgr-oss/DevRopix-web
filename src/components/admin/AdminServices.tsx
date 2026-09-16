import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Check, Eye, EyeOff, Layers, Globe, Smartphone, Layout, Cpu, ShieldCheck } from 'lucide-react';
import { Service } from '../../types';
import { Modal } from '../common/Modal';

export const AdminServices: React.FC = () => {
  const { language, t, services, addService, updateService, deleteService, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form states
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descAr, setDescAr] = useState('');
  const [icon, setIcon] = useState('Globe');
  const [featuresEn, setFeaturesEn] = useState('');
  const [featuresAr, setFeaturesAr] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [sortOrder, setSortOrder] = useState(1);
  const [published, setPublished] = useState(true);

  const availableIcons = ['Globe', 'Smartphone', 'Layout', 'Cpu', 'Layers', 'ShieldCheck'];

  const openCreateModal = () => {
    setEditingService(null);
    setTitleEn('');
    setTitleAr('');
    descEn && setDescEn('');
    descAr && setDescAr('');
    setIcon('Globe');
    setFeaturesEn('');
    setFeaturesAr('');
    setTechnologies('React, TypeScript, Tailwind');
    setSortOrder(services.length + 1);
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setTitleEn(s.title_en);
    setTitleAr(s.title_ar);
    setDescEn(s.description_en);
    setDescAr(s.description_ar);
    setIcon(s.icon);
    setFeaturesEn(s.features_en.join('\n'));
    setFeaturesAr(s.features_ar.join('\n'));
    setTechnologies(s.technologies.join(', '));
    setSortOrder(s.sort_order);
    setPublished(s.published);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const featEnArray = featuresEn.split('\n').map((f) => f.trim()).filter(Boolean);
    const featArArray = featuresAr.split('\n').map((f) => f.trim()).filter(Boolean);
    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        title_en: titleEn,
        title_ar: titleAr,
        description_en: descEn,
        description_ar: descAr,
        icon,
        features_en: featEnArray,
        features_ar: featArArray,
        technologies: techArray,
        sort_order: Number(sortOrder),
        published,
      });
      addToast('success', language === 'ar' ? 'تم التحديث' : 'Service Updated', language === 'ar' ? 'تم تحديث بيانات الخدمة بنجاح' : 'Service saved successfully');
    } else {
      addService({
        title_en: titleEn,
        title_ar: titleAr,
        description_en: descEn,
        description_ar: descAr,
        icon,
        features_en: featEnArray,
        features_ar: featArArray,
        technologies: techArray,
        sort_order: Number(sortOrder),
        published,
      });
      addToast('success', language === 'ar' ? 'تمت الإضافة' : 'Service Created', language === 'ar' ? 'تم إنشاء الخدمة الجديدة بنجاح' : 'New service added successfully');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف خدمة "${name}"؟` : `Are you sure you want to delete service "${name}"?`)) {
      deleteService(id);
      addToast('info', language === 'ar' ? 'تم الحذف' : 'Service Deleted', language === 'ar' ? 'تم حذف الخدمة من النظام' : 'Service removed');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.services}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'إدارة الخدمات والحلول البرمجية التي تقدمها الشركة' : 'Manage your digital studio services & technical offerings'}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.admin.newService}</span>
        </button>
      </div>

      {/* Services Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">#</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الخدمة (عربي / إنجليزي)' : 'Service Name'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'التقنيات' : 'Technologies'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-6 py-3.5 text-end">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400">0{srv.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{srv.title_en}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{srv.title_ar}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {srv.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                          {tech}
                        </span>
                      ))}
                      {srv.technologies.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{srv.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateService(srv.id, { published: !srv.published })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        srv.published
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {srv.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{srv.published ? (language === 'ar' ? 'نشط' : 'Published') : (language === 'ar' ? 'مخفي' : 'Draft')}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(srv)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title={t.admin.edit}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id, srv.title_en)}
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

      {/* Add / Edit Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? (language === 'ar' ? 'تعديل الخدمة' : 'Edit Service') : t.admin.newService}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Title (English) *
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                العنوان (عربي) *
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: تطوير المواقع الإلكترونية"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
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
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                الوصف (عربي) *
              </label>
              <textarea
                required
                rows={3}
                value={descAr}
                onChange={(e) => setDescAr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Icon Representation
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
              >
                {availableIcons.map((ic) => (
                  <option key={ic} value={ic}>{ic}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sort Order #
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
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
              placeholder="React, Next.js, Node.js, TypeScript"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Features List (EN, one per line)
              </label>
              <textarea
                rows={3}
                value={featuresEn}
                onChange={(e) => setFeaturesEn(e.target.value)}
                placeholder="High Performance Web Apps&#10;Custom API Architecture&#10;Cloud Native"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                الميزات (عربي، سطر لكل ميزة)
              </label>
              <textarea
                rows={3}
                value={featuresAr}
                onChange={(e) => setFeaturesAr(e.target.value)}
                placeholder="تطبيقات ويب سريعة وفائقة الأداء&#10;بنى برمجية مخصصة للواجهات والـ API"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="srv-published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="srv-published" className="text-xs font-semibold text-slate-700 cursor-pointer">
              {language === 'ar' ? 'نشر هذه الخدمة فوراً على الموقع' : 'Publish live on website'}
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
