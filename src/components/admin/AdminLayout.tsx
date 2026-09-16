import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DevRopixLogo } from '../common/DevRopixLogo';
import { 
  LayoutDashboard, 
  Layers, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Users, 
  Handshake, 
  Settings as SettingsIcon, 
  LogOut, 
  ExternalLink, 
  Globe, 
  Menu, 
  X,
  Shield
} from 'lucide-react';
import { AdminView } from '../../types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { 
    language, 
    toggleLanguage, 
    t, 
    currentView, 
    setCurrentView, 
    logoutAdmin, 
    messages 
  } = useApp();

  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const navItems: { view: AdminView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { view: 'admin-overview', label: t.admin.overview, icon: <LayoutDashboard className="w-4 h-4" /> },
    { view: 'admin-services', label: t.admin.services, icon: <Layers className="w-4 h-4" /> },
    { view: 'admin-projects', label: t.admin.projects, icon: <Briefcase className="w-4 h-4" /> },
    { view: 'admin-blog', label: t.admin.blog, icon: <FileText className="w-4 h-4" /> },
    { view: 'admin-testimonials', label: t.admin.testimonials, icon: <Users className="w-4 h-4" /> },
    { view: 'admin-partners', label: t.admin.partners, icon: <Handshake className="w-4 h-4" /> },
    { view: 'admin-messages', label: t.admin.messages, icon: <MessageSquare className="w-4 h-4" />, badge: unreadCount },
    { view: 'admin-settings', label: t.admin.settings, icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const handleNav = (view: AdminView) => {
    setCurrentView(view);
    setIsSidebarMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {isSidebarMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <DevRopixLogo size="sm" />
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700">
            <Shield className="w-3 h-3" />
            <span>Admin Portal</span>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Public Website Shortcut */}
          <button
            onClick={() => setCurrentView('home')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <span>{language === 'ar' ? 'عرض الموقع' : 'Public Site'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 border border-slate-200 rounded-lg"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.nav.switchLang}</span>
          </button>

          {/* Logout */}
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 rounded-lg transition-colors"
            title={t.admin.logout}
          >
            <LogOut className="w-3.5 h-3.5 rtl:rotate-180" />
            <span className="hidden sm:inline">{t.admin.logout}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex w-64 bg-white border-e border-slate-200 flex-col justify-between p-4 shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {language === 'ar' ? 'القائمة الرئيسية' : 'Control Center'}
            </div>
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-white text-indigo-700' : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User profile capsule at bottom */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="overflow-hidden text-start">
              <div className="text-xs font-bold text-slate-800 truncate">DevRopix Admin</div>
              <div className="text-[10px] text-slate-500 truncate">admin@devropix.com</div>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {isSidebarMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => setIsSidebarMobileOpen(false)}
            />
            <aside className="relative w-64 bg-white p-4 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-start duration-200">
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <DevRopixLogo size="sm" />
                  <button onClick={() => setIsSidebarMobileOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {navItems.map((item) => {
                  const isActive = currentView === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => handleNav(item.view)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={logoutAdmin}
                className="w-full py-2.5 border border-rose-200 text-rose-600 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4 rtl:rotate-180" />
                <span>{t.admin.logout}</span>
              </button>
            </aside>
          </div>
        )}

        {/* Main Admin Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
