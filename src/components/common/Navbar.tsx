import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DevRopixLogo } from './DevRopixLogo';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { PublicPage } from '../../types';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t, currentView, setCurrentView } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: PublicPage }[] = [
    { label: t.nav.home, view: 'home' },
    { label: t.nav.services, view: 'services' },
    { label: t.nav.projects, view: 'projects' },
    { label: t.nav.about, view: 'about' },
    { label: t.nav.blog, view: 'blog' },
    { label: t.nav.contact, view: 'contact' },
  ];

  const handleNavClick = (view: PublicPage) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentView === 'home';
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-b border-transparent py-5'
          : isHome
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-start focus:outline-none"
        >
          <DevRopixLogo size="md" isLight={isHome} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isHome
                    ? isActive
                      ? isTransparent
                        ? 'text-white bg-white/20 font-semibold shadow-xs'
                        : 'text-indigo-400 bg-indigo-950/60 font-semibold border border-indigo-500/30'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                    : isActive
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Language Switcher, CTA) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              isHome
                ? 'text-white bg-white/10 hover:bg-white/20 border-white/20'
                : 'text-slate-700 hover:text-indigo-600 bg-slate-100/80 hover:bg-indigo-50 border-slate-200'
            }`}
            title={language === 'en' ? 'Switch to Arabic' : 'التحويل للإنجليزية'}
          >
            <Globe className={`w-3.5 h-3.5 ${isHome ? 'text-indigo-300' : 'text-slate-500'}`} />
            <span>{t.nav.switchLang}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-4.5 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/25 transition-all border border-indigo-400/20"
          >
            <span>{t.nav.letsTalk}</span>
            <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
              isHome
                ? 'text-white bg-white/10 border-white/20'
                : 'text-slate-700 bg-slate-100 border-slate-200'
            }`}
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isHome
                ? 'text-white hover:bg-white/10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200 ${
            isHome
              ? 'bg-slate-950/95 backdrop-blur-xl border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isHome
                      ? isActive
                        ? 'text-indigo-400 bg-indigo-950/60 font-semibold'
                        : 'text-slate-200 hover:bg-white/10'
                      : isActive
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className={`pt-3 border-t flex flex-col gap-2.5 ${isHome ? 'border-slate-800' : 'border-slate-100'}`}>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-xs"
            >
              <span>{t.nav.letsTalk}</span>
              <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
