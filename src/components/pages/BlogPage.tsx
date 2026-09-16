import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Calendar, Clock, User, ArrowUpRight, BookOpen, Filter } from 'lucide-react';
import { BlogPost } from '../../types';

export const BlogPage: React.FC = () => {
  const { language, t, blogPosts, setSelectedBlogPost } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { key: 'All', label_en: 'All Articles', label_ar: 'جميع المقالات' },
    { key: 'Architecture', label_en: 'Architecture', label_ar: 'البنية البرمجية' },
    { key: 'Mobile', label_en: 'Mobile Engineering', label_ar: 'تطوير الموبايل' },
    { key: 'UI/UX', label_en: 'UI/UX Design', label_ar: 'تصميم UI/UX' },
  ];

  const filteredPosts = blogPosts
    .filter((p) => p.published)
    .filter((p) => {
      if (selectedCategory === 'All') return true;
      return p.category === selectedCategory;
    })
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = p.title_en.toLowerCase().includes(q) || p.title_ar.toLowerCase().includes(q);
      const excerptMatch = p.excerpt_en.toLowerCase().includes(q) || p.excerpt_ar.toLowerCase().includes(q);
      const authorMatch = p.author.toLowerCase().includes(q);
      return titleMatch || excerptMatch || authorMatch;
    });

  // Featured Lead Article
  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
            <span>{t.blog.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.blog.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.blog.subtitle}
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const label = language === 'ar' ? cat.label_ar : cat.label_en;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في مقالات التكنولوجيا...' : 'Search articles by keyword...'}
              className="w-full ps-9 pe-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {language === 'ar' ? 'لم يتم العثور على مقالات' : 'No articles found matching your query'}
            </h3>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Post Card (Hero) */}
            {featuredPost && (
              <div
                onClick={() => setSelectedBlogPost(featuredPost)}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 h-72 sm:h-96 lg:h-[400px] overflow-hidden bg-slate-100 relative">
                    <img
                      src={featuredPost.featured_image}
                      alt={language === 'ar' ? featuredPost.title_ar : featuredPost.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 shadow-2xs">
                      {language === 'ar' ? featuredPost.category_ar : featuredPost.category}
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 sm:p-10 text-start space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{featuredPost.published_date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{featuredPost.read_time}</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                      {language === 'ar' ? featuredPost.title_ar : featuredPost.title_en}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {language === 'ar' ? featuredPost.excerpt_ar : featuredPost.excerpt_en}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <User className="w-4 h-4 text-indigo-600" />
                        <span>{featuredPost.author}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600">
                        <span>{t.blog.readMore}</span>
                        <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rest of Articles Grid */}
            {restPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restPosts.map((post) => {
                  const title = language === 'ar' ? post.title_ar : post.title_en;
                  const excerpt = language === 'ar' ? post.excerpt_ar : post.excerpt_en;
                  const category = language === 'ar' ? post.category_ar : post.category;

                  return (
                    <article
                      key={post.id}
                      onClick={() => setSelectedBlogPost(post)}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
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

                        <div className="p-6 text-start">
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                            <span>{post.published_date}</span>
                            <span>•</span>
                            <span>{post.read_time}</span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                        <span className="text-slate-500 text-[11px] font-medium">{post.author}</span>
                        <span className="inline-flex items-center gap-1">
                          <span>{t.blog.readMore}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
