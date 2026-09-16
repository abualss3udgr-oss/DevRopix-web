import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { Calendar, Clock, User, Share2, Tag, ArrowLeft } from 'lucide-react';

export const BlogModal: React.FC = () => {
  const { language, t, selectedBlogPost, setSelectedBlogPost, addToast } = useApp();

  if (!selectedBlogPost) return null;

  const title = language === 'ar' ? selectedBlogPost.title_ar : selectedBlogPost.title_en;
  const content = language === 'ar' ? selectedBlogPost.content_ar : selectedBlogPost.content_en;
  const category = language === 'ar' ? selectedBlogPost.category_ar : selectedBlogPost.category;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('success', language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied', language === 'ar' ? 'يمكنك مشاركة المقال الآن' : 'Article link copied to clipboard');
    }
  };

  return (
    <Modal
      isOpen={!!selectedBlogPost}
      onClose={() => setSelectedBlogPost(null)}
      maxWidth="4xl"
    >
      <div className="space-y-6 text-start">
        {/* Cover image */}
        <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-slate-100 border border-slate-200">
          <img
            src={selectedBlogPost.featured_image}
            alt={title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 shadow-sm">
            {category}
          </div>
        </div>

        {/* Title & Metadata */}
        <div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium mb-3">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>{selectedBlogPost.author}</span> ({selectedBlogPost.author_role})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedBlogPost.published_date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedBlogPost.read_time}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
        </div>

        {/* Article Body */}
        <div className="border-t border-b border-slate-100 py-6 text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
          {content}
        </div>

        {/* SEO & Meta Info Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-600" />
            <span>SEO Metadata (Open Graph & Schema)</span>
          </div>
          <div><strong className="text-slate-700">Meta Title:</strong> {selectedBlogPost.seo_title}</div>
          <div><strong className="text-slate-700">Meta Description:</strong> {selectedBlogPost.seo_description}</div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => setSelectedBlogPost(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            {language === 'ar' ? 'إغلاق المقال' : 'Close Article'}
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t.blog.shareArticle}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
