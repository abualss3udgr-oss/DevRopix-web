import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Linkedin, 
  Github, 
  Twitter, 
  Instagram,
  AlertCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t, settings, services, selectedService, addContactMessage, addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(
    selectedService 
      ? (language === 'ar' ? selectedService.title_ar : selectedService.title_en)
      : (language === 'ar' ? 'تطوير المواقع الإلكترونية' : 'Web Development')
  );
  const [budget, setBudget] = useState('$5,000 - $15,000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const budgetOptions = [
    { label_en: 'Under $5,000', label_ar: 'أقل من 5,000 دولار' },
    { label_en: '$5,000 - $15,000', label_ar: '5,000 - 15,000 دولار' },
    { label_en: '$15,000 - $35,000', label_ar: '15,000 - 35,000 دولار' },
    { label_en: '$35,000 - $75,000+', label_ar: '35,000 - 75,000+ دولار' },
    { label_en: 'Dedicated Squad / Retainer', label_ar: 'فريق برمجي مخصص / اشتراك شهري' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال الاسم بالكامل' : 'Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid work email address');
      return;
    }

    if (!message.trim() || message.length < 10) {
      setErrorMsg(language === 'ar' ? 'يرجى كتابة تفاصيل مشروعك بشكل أوضح' : 'Please provide some details about your project goals');
      return;
    }

    setIsSubmitting(true);

    try {
      addContactMessage({
        name,
        email,
        phone,
        company,
        service,
        budget,
        message,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast(
        'success',
        t.contact.successTitle,
        t.contact.successDesc
      );

      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setMessage('');
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(language === 'ar' ? 'حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً' : 'An error occurred while submitting. Please try again.');
    }
  };

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase">
            <span>{t.contact.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Main Grid: Form Left, Company Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: Interactive Request-for-Proposal Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs text-start">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'ar' ? 'نموذج مناقشة المشروع واستشارة الخبراء' : 'Project Consultation & Proposal Form'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'ar' ? 'يتم الرد خلال ٢٤ ساعة مع دراسة مبدئية للمتطلبات وتكلفة تقديرية.' : 'Guaranteed reply within 24 hours with an architectural breakdown & estimate.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">
                  {t.contact.successTitle}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {t.contact.successDesc}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-xs hover:bg-indigo-700 transition-colors"
                  >
                    {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ar' ? 'أحمد محمد' : 'Jane Doe'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+20 100 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dir-ltr text-start"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={language === 'ar' ? 'اسم الشركة أو المشروع' : 'Startup or Enterprise Inc.'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.serviceLabel}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={language === 'ar' ? s.title_ar : s.title_en}>
                          {language === 'ar' ? s.title_ar : s.title_en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.contact.budgetLabel}
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                    >
                      {budgetOptions.map((b, i) => (
                        <option key={i} value={language === 'ar' ? b.label_ar : b.label_en}>
                          {language === 'ar' ? b.label_ar : b.label_en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.contact.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:opacity-70 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
                  >
                    <Send className="w-4 h-4 rtl:rotate-180" />
                    <span>{isSubmitting ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') : t.contact.submitBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Col 2: Direct Contact Hubs & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-start">
            
            {/* Direct Cards */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6 shadow-md">
              <div>
                <h4 className="text-xl font-bold tracking-tight text-white mb-2">
                  {t.contact.directInfo}
                </h4>
                <p className="text-xs text-slate-400">
                  {language === 'ar' ? 'تواصل معنا مباشرة عبر القنوات الرسمية:' : 'Connect directly with our engineering advisory squad:'}
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">{language === 'ar' ? 'البريد الإلكتروني' : 'Direct Email'}</div>
                    <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{settings.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">{language === 'ar' ? 'رقم الهاتف' : 'Telephone / Voice'}</div>
                    <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors dir-ltr text-start">{settings.phone}</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">{language === 'ar' ? 'ساعات العمل الرسمية' : 'Operating Hours'}</div>
                    <div className="text-xs font-semibold text-slate-200">
                      {language === 'ar' ? settings.working_hours_ar : settings.working_hours_en}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">{language === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}</div>
                    <div className="text-xs font-semibold text-slate-200">
                      {language === 'ar' ? settings.address_ar : settings.address_en}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  {language === 'ar' ? 'قنوات التواصل الاجتماعي' : 'Follow DevRopix'}
                </div>
                <div className="flex items-center gap-2">
                  <a href={settings.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={settings.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={settings.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick SLA Note */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-600 space-y-1 shadow-2xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>NDA & Confidentiality</span>
              </div>
              <p>
                {language === 'ar'
                  ? 'جميع المعلومات والأفكار المشتركة تخضع لاتفاقية عدم إفصاح (NDA) ملزمة لحماية أفكاركم التجارية.'
                  : 'All proprietary discussions and concepts are protected under our mutual Non-Disclosure Agreement (NDA).'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
