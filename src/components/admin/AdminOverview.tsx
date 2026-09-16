import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Layers, 
  FileText, 
  MessageSquare, 
  Users, 
  Handshake, 
  ArrowUpRight, 
  Mail, 
  CheckCircle, 
  Eye, 
  PlusCircle, 
  Clock 
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { 
    language, 
    t, 
    services, 
    projects, 
    blogPosts, 
    messages, 
    testimonials, 
    partners, 
    setCurrentView, 
    updateMessageStatus 
  } = useApp();

  const unreadMessages = messages.filter((m) => m.status === 'unread');
  const recentMessages = messages.slice(0, 5);
  const recentProjects = projects.slice(0, 4);

  const kpis = [
    {
      label: t.admin.projects,
      value: projects.length,
      sub: `${projects.filter((p) => p.featured).length} ${language === 'ar' ? 'مميز' : 'featured'}`,
      icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-100',
      action: () => setCurrentView('admin-projects'),
    },
    {
      label: t.admin.services,
      value: services.length,
      sub: `${services.filter((s) => s.published).length} ${language === 'ar' ? 'منشور' : 'active'}`,
      icon: <Layers className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-100',
      action: () => setCurrentView('admin-services'),
    },
    {
      label: t.admin.blog,
      value: blogPosts.length,
      sub: `${blogPosts.filter((b) => b.published).length} ${language === 'ar' ? 'مقالات منشورة' : 'published'}`,
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-100',
      action: () => setCurrentView('admin-blog'),
    },
    {
      label: t.admin.unreadMessages,
      value: unreadMessages.length,
      sub: `${messages.length} ${language === 'ar' ? 'إجمالي الرسائل' : 'total'}`,
      icon: <MessageSquare className="w-5 h-5 text-amber-600" />,
      color: 'bg-amber-50 border-amber-100',
      action: () => setCurrentView('admin-messages'),
    },
  ];

  return (
    <div className="space-y-8 text-start">
      
      {/* Top Banner with Quick Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.admin.welcomeAdmin}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ar'
              ? 'مرحباً بك في لوحة تحكم DevRopix. يمكنك إدارة جميع أقسام ومشاريع الموقع من هنا.'
              : 'Manage your portfolio, client inquiries, blog posts, and services in real-time.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCurrentView('admin-projects')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.admin.newProject}</span>
          </button>
          <button
            onClick={() => setCurrentView('admin-services')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.admin.newService}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            onClick={kpi.action}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${kpi.color}`}>
                {kpi.icon}
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{kpi.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Inquiries (7 cols) + Recent Projects (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">{t.admin.recentInquiries}</h3>
              </div>
              <button
                onClick={() => setCurrentView('admin-messages')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>{language === 'ar' ? 'عرض الكل' : 'View Inbox'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
              </button>
            </div>

            {recentMessages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                {language === 'ar' ? 'لا توجد رسائل جديدة' : 'No inquiries received yet.'}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{msg.name}</span>
                        {msg.status === 'unread' && (
                          <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-extrabold">
                            {language === 'ar' ? 'جديد' : 'NEW'}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">{msg.created_at}</span>
                      </div>
                      <div className="text-xs text-indigo-600 font-medium">{msg.service} • {msg.budget}</div>
                      <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {msg.status === 'unread' && (
                        <button
                          onClick={() => updateMessageStatus(msg.id, 'read')}
                          title="Mark as read"
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setCurrentView('admin-messages')}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">{language === 'ar' ? 'أحدث المشاريع' : 'Featured Showcase'}</h3>
              </div>
              <button
                onClick={() => setCurrentView('admin-projects')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>{language === 'ar' ? 'إدارة المشاريع' : 'Manage'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
              </button>
            </div>

            <div className="space-y-3">
              {recentProjects.map((proj) => (
                <div key={proj.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
                  <img src={proj.main_image} alt={proj.title_en} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {language === 'ar' ? proj.title_ar : proj.title_en}
                    </h4>
                    <div className="text-[11px] text-slate-500">{proj.client} • {proj.category}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    proj.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {proj.published ? (language === 'ar' ? 'منشور' : 'Live') : (language === 'ar' ? 'مسودة' : 'Draft')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
