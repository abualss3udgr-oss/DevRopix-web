import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar, User, Clock, Tag } from 'lucide-react';
import { BlogPost } from '../../types';
import { Modal } from '../common/Modal';
import { ImageUploader } from '../common/ImageUploader';

export const AdminBlog: React.FC = () => {
  const { language, t, blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form states
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [excerptAr, setExcerptAr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [categoryAr, setCategoryAr] = useState('البنية البرمجية');
  const [author, setAuthor] = useState('Karim Sherif');
  const [authorRole, setAuthorRole] = useState('Chief Architect');
  const [readTime, setReadTime] = useState('5 min read');
  const [featuredImage, setFeaturedImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [published, setPublished] = useState(true);

  const categories = [
    { en: 'Architecture', ar: 'البنية البرمجية' },
    { en: 'Mobile', ar: 'تطوير الموبايل' },
    { en: 'UI/UX', ar: 'تصميم UI/UX' },
    { en: 'Engineering', ar: 'هندسة البرمجيات' },
  ];

  const openCreateModal = () => {
    setEditingPost(null);
    setTitleEn('');
    setTitleAr('');
    setExcerptEn('');
    setExcerptAr('');
    setContentEn('');
    setContentAr('');
    setCategory('Architecture');
    setCategoryAr('البنية البرمجية');
    setAuthor('Karim Sherif');
    setAuthorRole('Chief Architect');
    setReadTime('6 min read');
    setFeaturedImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop');
    setSeoTitle('');
    setSeoDesc('');
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: BlogPost) => {
    setEditingPost(p);
    setTitleEn(p.title_en);
    setTitleAr(p.title_ar);
    setExcerptEn(p.excerpt_en);
    setExcerptAr(p.excerpt_ar);
    setContentEn(p.content_en);
    setContentAr(p.content_ar);
    setCategory(p.category);
    setCategoryAr(p.category_ar);
    setAuthor(p.author);
    setAuthorRole(p.author_role);
    setReadTime(p.read_time);
    setFeaturedImage(p.featured_image);
    setSeoTitle(p.seo_title);
    setSeoDesc(p.seo_description);
    setPublished(p.published);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title_en: titleEn,
        title_ar: titleAr,
        excerpt_en: excerptEn,
        excerpt_ar: excerptAr,
        content_en: contentEn,
        content_ar: contentAr,
        category,
        category_ar: categoryAr,
        author,
        author_role: authorRole,
        read_time: readTime,
        featured_image: featuredImage,
        seo_title: seoTitle || titleEn,
        seo_description: seoDesc || excerptEn,
        published,
      });
      addToast('success', language === 'ar' ? 'تم تحديث المقال' : 'Article Updated', language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Article updated successfully');
    } else {
      addBlogPost({
        title_en: titleEn,
        title_ar: titleAr,
        excerpt_en: excerptEn,
        excerpt_ar: excerptAr,
        content_en: contentEn,
        content_ar: contentAr,
        category,
        category_ar: categoryAr,
        author,
        author_role: authorRole,
        read_time: readTime,
        featured_image: featuredImage,
        published_date: new Date().toISOString().split('T')[0],
        seo_title: seoTitle || titleEn,
        seo_description: seoDesc || excerptEn,
        published,
      });
      addToast('success', language === 'ar' ? 'تم نشر المقال' : 'Article Published', language === 'ar' ? 'تمت إضافة المقال بنجاح' : 'New article added successfully');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف مقال "${name}"؟` : `Are you sure you want to delete article "${name}"?`)) {
      deleteBlogPost(id);
      addToast('info', language === 'ar' ? 'تم الحذف' : 'Article Deleted', language === 'ar' ? 'تم حذف المقال من المدونة' : 'Article removed');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.blog}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'إدارة مقالات المدونة والتحليلات التقنية ونظام الـ SEO' : 'Manage tech articles, thought leadership & SEO metadata'}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.admin.newArticle}</span>
        </button>
      </div>

      {/* Blog Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">{language === 'ar' ? 'المقال' : 'Article'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'التصنيف والكاتب' : 'Category & Author'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'التاريخ والقراءة' : 'Date & Read Time'}</th>
                <th className="px-6 py-3.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-6 py-3.5 text-end">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={post.featured_image} alt={post.title_en} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{post.title_en}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{post.title_ar}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{post.author}</div>
                    <div className="text-[11px] text-indigo-600 font-medium">{post.category}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <div>{post.published_date}</div>
                    <div className="text-[11px] text-slate-400">{post.read_time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateBlogPost(post.id, { published: !post.published })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        post.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{post.published ? (language === 'ar' ? 'منشور' : 'Live') : (language === 'ar' ? 'مسودة' : 'Draft')}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title={t.admin.edit}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title_en)}
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

      {/* Add / Edit Blog Article Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? (language === 'ar' ? 'تعديل المقال' : 'Edit Article') : t.admin.newArticle}
        maxWidth="4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Title (English) *
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                عنوان المقال (عربي) *
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Read Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <ImageUploader
              label="Featured Article Cover"
              value={featuredImage}
              onChange={(url) => setFeaturedImage(url)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Excerpt (English) *
              </label>
              <textarea
                required
                rows={2}
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                مقدمة المقال (عربي) *
              </label>
              <textarea
                required
                rows={2}
                value={excerptAr}
                onChange={(e) => setExcerptAr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Article Content (English) *
              </label>
              <textarea
                required
                rows={6}
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                نص المقال الكامل (عربي) *
              </label>
              <textarea
                required
                rows={6}
                value={contentAr}
                onChange={(e) => setContentAr(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Google Search Snippet Title"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SEO Meta Description
              </label>
              <input
                type="text"
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Google Search Snippet Description"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="blog-publish"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="blog-publish" className="text-xs font-semibold text-slate-700 cursor-pointer">
              {language === 'ar' ? 'نشر هذا المقال فوراً على الموقع' : 'Publish live on blog'}
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
