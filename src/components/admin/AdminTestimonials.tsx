import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { Testimonial } from '../../types';
import { Modal } from '../common/Modal';
import { ImageUploader } from '../common/ImageUploader';

export const AdminTestimonials: React.FC = () => {
  const { language, t, testimonials, addTestimonial, updateTestimonial, deleteTestimonial, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [avatar, setAvatar] = useState('');
  const [rating, setRating] = useState(5);
  const [contentEn, setContentEn] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setEditingItem(null);
    setName('');
    setCompany('');
    setPosition('');
    setAvatar('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop');
    setRating(5);
    setContentEn('');
    setContentAr('');
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setName(item.name);
    setCompany(item.company);
    setPosition(item.position);
    setAvatar(item.avatar);
    setRating(item.rating);
    setContentEn(item.content_en);
    setContentAr(item.content_ar);
    setPublished(item.published);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      updateTestimonial(editingItem.id, {
        name,
        company,
        position,
        avatar,
        rating: Number(rating),
        content_en: contentEn,
        content_ar: contentAr,
        published,
      });
      addToast('success', language === 'ar' ? 'تم التحديث' : 'Updated', language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Testimonial updated');
    } else {
      addTestimonial({
        name,
        company,
        position,
        avatar,
        rating: Number(rating),
        content_en: contentEn,
        content_ar: contentAr,
        published,
      });
      addToast('success', language === 'ar' ? 'تمت الإضافة' : 'Created', language === 'ar' ? 'تمت إضافة رأي العميل بنجاح' : 'New testimonial added');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, clientName: string) => {
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف رأي العميل "${clientName}"؟` : `Delete testimonial from "${clientName}"?`)) {
      deleteTestimonial(id);
      addToast('info', language === 'ar' ? 'تم الحذف' : 'Deleted', language === 'ar' ? 'تم حذف رأي العميل' : 'Testimonial removed');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.testimonials}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'إدارة آراء وتقييمات عملاء وشركاء DevRopix' : 'Manage client reviews, endorsements and ratings'}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.admin.newTestimonial}</span>
        </button>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">{language === 'ar' ? 'العميل' : 'Client'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الشركة والمنصب' : 'Company & Role'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'التقييم' : 'Rating'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-6 py-3.5 text-end">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 italic">
                          "{language === 'ar' ? item.content_ar : item.content_en}"
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-indigo-600">{item.company}</div>
                    <div className="text-[11px] text-slate-500">{item.position}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{item.rating}.0</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateTestimonial(item.id, { published: !item.published })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        item.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{item.published ? (language === 'ar' ? 'منشور' : 'Live') : (language === 'ar' ? 'مسودة' : 'Draft')}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? (language === 'ar' ? 'تعديل رأي العميل' : 'Edit Review') : t.admin.newTestimonial}
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Position / Job Title
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="CEO / Founder / CTO"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Star Rating (1 - 5)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
              >
                <option value={5}>5 Stars (★★★★★)</option>
                <option value={4}>4 Stars (★★★★☆)</option>
                <option value={3}>3 Stars (★★★☆☆)</option>
              </select>
            </div>
          </div>

          <div>
            <ImageUploader
              label="Client Photo / Avatar"
              value={avatar}
              onChange={(url) => setAvatar(url)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Testimonial Text (English) *
              </label>
              <textarea
                required
                rows={3}
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                نص رأي العميل (عربي) *
              </label>
              <textarea
                required
                rows={3}
                value={contentAr}
                onChange={(e) => setContentAr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="testi-pub"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="testi-pub" className="text-xs font-semibold text-slate-700 cursor-pointer">
              {language === 'ar' ? 'عرض هذا التقييم في الواجهة الرئيسية' : 'Show live on website'}
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
