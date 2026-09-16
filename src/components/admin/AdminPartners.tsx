import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Globe, Check, Eye, EyeOff } from 'lucide-react';
import { Partner } from '../../types';
import { Modal } from '../common/Modal';

export const AdminPartners: React.FC = () => {
  const { language, t, partners, addPartner, updatePartner, deletePartner, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [website, setWebsite] = useState('');
  const [sortOrder, setSortOrder] = useState(1);
  const [active, setActive] = useState(true);

  const openCreateModal = () => {
    setEditingPartner(null);
    setName('');
    setLogo('');
    setWebsite('https://example.com');
    setSortOrder(partners.length + 1);
    setActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Partner) => {
    setEditingPartner(p);
    setName(p.name);
    setLogo(p.logo);
    setWebsite(p.website || '');
    setSortOrder(p.sort_order);
    setActive(p.active);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPartner) {
      updatePartner(editingPartner.id, {
        name,
        logo: logo || name.substring(0, 2).toUpperCase(),
        website,
        sort_order: Number(sortOrder),
        active,
      });
      addToast('success', language === 'ar' ? 'تم التحديث' : 'Partner Updated', language === 'ar' ? 'تم حفظ التعديلات' : 'Partner updated');
    } else {
      addPartner({
        name,
        logo: logo || name.substring(0, 2).toUpperCase(),
        website,
        sort_order: Number(sortOrder),
        active,
      });
      addToast('success', language === 'ar' ? 'تمت الإضافة' : 'Partner Added', language === 'ar' ? 'تمت إضافة الشريك بنجاح' : 'New partner added');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, partnerName: string) => {
    if (window.confirm(language === 'ar' ? `حذف الشريك "${partnerName}"؟` : `Delete partner "${partnerName}"?`)) {
      deletePartner(id);
      addToast('info', language === 'ar' ? 'تم الحذف' : 'Deleted', language === 'ar' ? 'تم حذف الشريك' : 'Partner removed');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.partners}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'إدارة شعارات العملاء وشركاء النجاح في شريط الـ Marquee' : 'Manage client logos & enterprise partners shown in marquee ticker'}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.admin.newPartner}</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">#</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'اسم الشريك / العلامة التجارية' : 'Partner Brand Name'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الموقع الإلكتروني' : 'Website Link'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-6 py-3.5 text-end">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400">0{p.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {p.name.substring(0, 2)}
                      </div>
                      <span className="font-bold text-slate-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {p.website ? (
                      <a href={p.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                        <span>{p.website}</span>
                        <Globe className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updatePartner(p.id, { active: !p.active })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        p.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{p.active ? (language === 'ar' ? 'ظاهر' : 'Active') : (language === 'ar' ? 'مخفي' : 'Hidden')}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
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
        title={editingPartner ? (language === 'ar' ? 'تعديل الشريك' : 'Edit Partner') : t.admin.newPartner}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Partner / Client Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aramco Digital, Tabby, Paymob"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://company.com"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Order #
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="partner-active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="partner-active" className="text-xs font-semibold text-slate-700 cursor-pointer">
              {language === 'ar' ? 'تفعيل ظهور الشعار في شريط العملاء' : 'Active on ticker'}
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
