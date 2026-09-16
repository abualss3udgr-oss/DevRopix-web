import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DevRopixLogo } from '../common/DevRopixLogo';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, Globe } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { language, toggleLanguage, t, loginAdmin, setCurrentView } = useApp();
  const [email, setEmail] = useState('admin@devropix.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email, password);
      setLoading(false);
      if (success) {
        setCurrentView('admin-overview');
      } else {
        setError(language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl text-start">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <DevRopixLogo size="md" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>{language === 'ar' ? 'بوابة إدارة DevRopix' : 'DevRopix Admin Portal'}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.admin.loginTitle}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar' ? 'سجّل الدخول للتحكم في المشاريع والمحتوى والرسائل' : 'Sign in to manage studio content, portfolio & inquiries'}
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs text-slate-700 space-y-1">
          <div className="font-bold text-indigo-700 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'بيانات الحساب التجريبي المعتمدة:' : 'Demo Access Credentials:'}</span>
          </div>
          <div className="flex justify-between font-mono text-[11px] text-slate-600">
            <span>Email: <strong>admin@devropix.com</strong></span>
            <span>Pass: <strong>password</strong></span>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.admin.email}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@devropix.com"
                className="w-full ps-10 pe-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.admin.password}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ps-10 pe-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-600/20 transition-all active:scale-98"
            >
              <span>{loading ? (language === 'ar' ? 'جارٍ التحقق...' : 'Authenticating...') : t.admin.loginButton}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </form>

        {/* Back to website & Language switch */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-indigo-600 font-medium"
          >
            ← {language === 'ar' ? 'العودة للموقع الرئيسي' : 'Back to Public Website'}
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 hover:text-indigo-600 font-semibold"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.nav.switchLang}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
