import React from 'react';
import { useApp } from '../../context/AppContext';
import { DevRopixLogo } from './DevRopixLogo';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram, 
  Facebook, 
  ArrowUpRight 
} from 'lucide-react';
import { PublicPage } from '../../types';

export const Footer: React.FC = () => {
  const { language, toggleLanguage, t, setCurrentView, settings, services } = useApp();

  const handleNav = (page: PublicPage) => {
    setCurrentView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <DevRopixLogo isLight size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {language === 'ar' ? settings.tagline_ar : settings.tagline_en}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition-colors">
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-white transition-colors">
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {t.footer.services}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleNav('services')}
                    className="hover:text-white transition-colors text-start"
                  >
                    {language === 'ar' ? srv.title_ar : srv.title_en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {t.footer.connect}
            </h3>
            <div className="flex items-start gap-3 text-sm">
              <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
              <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                {settings.email}
              </a>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
              <span className="dir-ltr text-start">{settings.phone}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
              <span>{language === 'ar' ? settings.address_ar : settings.address_en}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('contact')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <span>{t.nav.letsTalk}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} DevRopix. {t.footer.rights}
          </p>

          <div className="flex items-center gap-6">
            <button onClick={toggleLanguage} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>{t.nav.switchLang}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
