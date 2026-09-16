import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '../../types';

export const BlogSection: React.FC = () => {
  const { language, t, blogPosts, setSelectedBlogPost, setCurrentView } = useApp();

  const latestPosts = blogPosts
    .filter((p) => p.published)
    .slice(0, 3);

  const handlePostClick = (post: BlogPost) => {
    setSelectedBlogPost(post);
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
              <span>{t.blog.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.blog.title}
            </h2>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              {t.blog.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl shadow-2xs transition-all self-start sm:self-end"
          >
            <span>{language === 'ar' ? 'تصفح كل المقالات' : 'View All Insights'}</span>
            <ArrowUpRight className="w-4 h-4 rtl:rotate-270 text-indigo-600" />
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => {
            const title = language === 'ar' ? post.title_ar : post.title_en;
            const excerpt = language === 'ar' ? post.excerpt_ar : post.excerpt_en;
            const category = language === 'ar' ? post.category_ar : post.category;

            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div>
                  {/* Featured Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.featured_image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-indigo-700 shadow-2xs">
                      {category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 text-start">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.published_date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.read_time}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer / Read More */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                  <div className="flex items-center gap-2 text-slate-500 text-[11px] font-medium">
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{post.author}</span>
                  </div>

                  <span className="inline-flex items-center gap-1">
                    <span>{t.blog.readMore}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
