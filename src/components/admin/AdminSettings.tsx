import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Globe, Phone, Mail, Share2, BarChart3, Search } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { language, t, settings, updateSettings, addToast } = useApp();

  const [formData, setFormData] = useState({ ...settings });

  const handleChange = (field: keyof typeof settings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    addToast(
      'success',
      language === 'ar' ? 'تم حفظ الإعدادات' : 'Settings Saved',
      language === 'ar' ? 'تم تحديث بيانات الشركة والموقع بنجاح' : 'System & SEO settings updated successfully'
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.settings}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'إدارة بيانات الشركة، قنوات التواصل، أرقام الإحصائيات وإعدادات الـ SEO' : 'Configure company branding, contacts, live telemetry stats & search metadata'}
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{t.admin.saveSettings}</span>
        </button>
      </div>

      {/* Card 1: Branding & Identity */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
          <Globe className="w-5 h-5 text-indigo-600" />
          <span>{language === 'ar' ? 'هوية الشركة والشعارات' : 'Company Branding & Slogans'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Company Name (EN)
            </label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              اسم الشركة (عربي)
            </label>
            <input
              type="text"
              value={formData.company_name_ar}
              onChange={(e) => handleChange('company_name_ar', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tagline (English)
            </label>
            <input
              type="text"
              value={formData.tagline_en}
              onChange={(e) => handleChange('tagline_en', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              الشعار اللفظي (عربي)
            </label>
            <input
              type="text"
              value={formData.tagline_ar}
              onChange={(e) => handleChange('tagline_ar', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Contact Information & Hubs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
          <Mail className="w-5 h-5 text-indigo-600" />
          <span>{language === 'ar' ? 'معلومات الاتصال والمقرات' : 'Direct Channels & Headquarter Locations'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Official Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone / Voice
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm dir-ltr text-start"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              WhatsApp Direct
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm dir-ltr text-start"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Address (English)
            </label>
            <input
              type="text"
              value={formData.address_en}
              onChange={(e) => handleChange('address_en', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              العنوان والمقر (عربي)
            </label>
            <input
              type="text"
              value={formData.address_ar}
              onChange={(e) => handleChange('address_ar', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Card 3: Dynamic Statistics Counters */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span>{language === 'ar' ? 'عدادات الإحصائيات في الموقع' : 'Public Telemetry & Statistics Counters'}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Projects Done (#)
            </label>
            <input
              type="number"
              value={formData.stats_projects}
              onChange={(e) => handleChange('stats_projects', Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold text-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Happy Clients (#)
            </label>
            <input
              type="number"
              value={formData.stats_clients}
              onChange={(e) => handleChange('stats_clients', Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold text-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Years Experience (#)
            </label>
            <input
              type="number"
              value={formData.stats_years}
              onChange={(e) => handleChange('stats_years', Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold text-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Technologies (#)
            </label>
            <input
              type="number"
              value={formData.stats_technologies}
              onChange={(e) => handleChange('stats_technologies', Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold text-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Card 4: Social Media Links */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
          <Share2 className="w-5 h-5 text-indigo-600" />
          <span>{language === 'ar' ? 'روابط شبكات التواصل' : 'Social Network Profiles'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">LinkedIn Profile</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">GitHub Organization</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Twitter / X</label>
            <input
              type="url"
              value={formData.twitter}
              onChange={(e) => handleChange('twitter', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Instagram</label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Facebook</label>
            <input
              type="url"
              value={formData.facebook}
              onChange={(e) => handleChange('facebook', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Card 5: Search Engine Optimization (SEO) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-indigo-600" />
          <span>{language === 'ar' ? 'إعدادات محركات البحث والـ SEO' : 'Search Engine Optimization (SEO)'}</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Default Meta Title
            </label>
            <input
              type="text"
              value={formData.default_title}
              onChange={(e) => handleChange('default_title', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.default_description}
              onChange={(e) => handleChange('default_description', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Social Sharing Image URL (og:image)
            </label>
            <input
              type="url"
              value={formData.og_image}
              onChange={(e) => handleChange('og_image', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-98"
        >
          <Save className="w-4 h-4" />
          <span>{t.admin.saveSettings}</span>
        </button>
      </div>
    </form>
  );
};
