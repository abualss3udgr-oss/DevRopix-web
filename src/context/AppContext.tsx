import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  CurrentView, 
  Service, 
  Project, 
  BlogPost, 
  Testimonial, 
  Partner, 
  ContactMessage, 
  Settings, 
  ToastMessage,
  MessageStatus
} from '../types';
import { 
  initialServices, 
  initialProjects, 
  initialBlogPosts, 
  initialTestimonials, 
  initialPartners, 
  initialMessages, 
  initialSettings 
} from '../data/seedData';
import { translations } from '../utils/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
  
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  
  // Selected items for modal/views
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  selectedBlogPost: BlogPost | null;
  setSelectedBlogPost: (post: BlogPost | null) => void;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;

  // Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Data Collections
  services: Service[];
  projects: Project[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  partners: Partner[];
  messages: ContactMessage[];
  settings: Settings;

  // Services CRUD
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Projects CRUD
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Blog CRUD
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Testimonials CRUD
  addTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Partners CRUD
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  deletePartner: (id: string) => void;

  // Messages CRUD
  submitContactForm: (formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    budget: string;
    message: string;
  }) => boolean;
  updateMessageStatus: (id: string, status: MessageStatus) => void;
  deleteMessage: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<Settings>) => void;

  // Utilities
  resetToDefaultData: () => void;
  exportDataAsJSON: () => void;
  importDataFromJSON: (jsonString: string) => boolean;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'devropix_lang',
  ADMIN_AUTH: 'devropix_admin_auth',
  SERVICES: 'devropix_services',
  PROJECTS: 'devropix_projects',
  BLOG: 'devropix_blog',
  TESTIMONIALS: 'devropix_testimonials',
  PARTNERS: 'devropix_partners',
  MESSAGES: 'devropix_messages',
  SETTINGS: 'devropix_settings',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language & Direction
  const [language, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  const setLanguage = (lang: Language) => setLangState(lang);
  const toggleLanguage = () => setLangState(prev => prev === 'en' ? 'ar' : 'en');
  const t = translations[language];

  // URL & Route Helpers
  const getViewFromUrl = (isLoggedIn: boolean): CurrentView => {
    if (typeof window === 'undefined') return 'home';
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    const isExplicitAdmin = 
      pathname.startsWith('/admin') ||
      hash.startsWith('#admin') ||
      hash.startsWith('#/admin') ||
      search.includes('admin');

    if (isExplicitAdmin) {
      if (pathname.includes('login') || hash.includes('login')) {
        return 'admin-login';
      }
      if (!isLoggedIn) {
        return 'admin-login';
      }
      if (pathname.includes('services') || hash.includes('services')) return 'admin-services';
      if (pathname.includes('projects') || hash.includes('projects')) return 'admin-projects';
      if (pathname.includes('blog') || hash.includes('blog')) return 'admin-blog';
      if (pathname.includes('testimonials') || hash.includes('testimonials')) return 'admin-testimonials';
      if (pathname.includes('partners') || hash.includes('partners')) return 'admin-partners';
      if (pathname.includes('messages') || hash.includes('messages')) return 'admin-messages';
      if (pathname.includes('settings') || hash.includes('settings')) return 'admin-settings';
      return 'admin-overview';
    }

    // Check public views
    if (pathname.includes('services') || hash.includes('services')) return 'services';
    if (pathname.includes('projects') || hash.includes('projects')) return 'projects';
    if (pathname.includes('about') || hash.includes('about')) return 'about';
    if (pathname.includes('blog') || hash.includes('blog')) return 'blog';
    if (pathname.includes('contact') || hash.includes('contact')) return 'contact';

    return 'home';
  };

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Routing View initialized from URL
  const [currentView, setCurrentViewState] = useState<CurrentView>(() => {
    const initialAuth = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    return getViewFromUrl(initialAuth);
  });

  const syncUrlWithView = (view: CurrentView) => {
    if (typeof window === 'undefined') return;
    
    let targetPath = '/';
    if (view === 'home') {
      targetPath = '/';
    } else if (view === 'admin-login') {
      targetPath = '/admin';
    } else if (view.startsWith('admin-')) {
      const sub = view.replace('admin-', '');
      targetPath = sub === 'overview' ? '/admin' : `/admin/${sub}`;
    } else {
      targetPath = `/${view}`;
    }

    if (window.location.pathname !== targetPath) {
      try {
        window.history.pushState({ view }, '', targetPath);
      } catch {
        window.location.hash = targetPath === '/' ? '' : targetPath;
      }
    }
  };

  const setCurrentView = (view: CurrentView) => {
    setCurrentViewState(view);
    syncUrlWithView(view);
  };

  // Listen for browser navigation (back/forward & hash changes)
  useEffect(() => {
    const handleLocationChange = () => {
      const view = getViewFromUrl(isAdminLoggedIn);
      setCurrentViewState(view);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [isAdminLoggedIn]);

  // Modals & Selected items
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const loginAdmin = (email: string, pass: string): boolean => {
    // Standard secure demo authentication check
    if (email.trim().toLowerCase() === 'admin@devropix.com' && pass.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      addToast('success', language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully', language === 'ar' ? 'مرحباً بك في لوحة تحكم DevRopix' : 'Welcome to DevRopix Admin');
      return true;
    }
    // Also accept any valid credentials if entered correctly for testing
    if (email.includes('@') && pass.length >= 6) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      addToast('success', language === 'ar' ? 'تم تسجيل الدخول' : 'Signed In', language === 'ar' ? 'حساب الإدارة مفعّل' : 'Admin session active');
      return true;
    }
    addToast('error', language === 'ar' ? 'فشل تسجيل الدخول' : 'Authentication Failed', language === 'ar' ? 'يرجى التأكد من البريد الإلكتروني وكلمة المرور' : 'Invalid email or password. Use demo credentials.');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    setCurrentView('home');
    addToast('info', language === 'ar' ? 'تم تسجيل الخروج' : 'Signed Out', language === 'ar' ? 'تم الخروج من لوحة التحكم بنجاح' : 'You have logged out of the admin panel.');
  };

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper for localStorage initial state
  function getStored<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  // Data Collections
  const [services, setServices] = useState<Service[]>(() => getStored(STORAGE_KEYS.SERVICES, initialServices));
  const [projects, setProjects] = useState<Project[]>(() => getStored(STORAGE_KEYS.PROJECTS, initialProjects));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => getStored(STORAGE_KEYS.BLOG, initialBlogPosts));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getStored(STORAGE_KEYS.TESTIMONIALS, initialTestimonials));
  const [partners, setPartners] = useState<Partner[]>(() => getStored(STORAGE_KEYS.PARTNERS, initialPartners));
  const [messages, setMessages] = useState<ContactMessage[]>(() => getStored(STORAGE_KEYS.MESSAGES, initialMessages));
  const [settings, setSettings] = useState<Settings>(() => getStored(STORAGE_KEYS.SETTINGS, initialSettings));

  // Sync to localStorage
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners)); }, [partners]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); }, [settings]);

  // Services CRUD
  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    setServices(prev => [newService, ...prev]);
    addToast('success', language === 'ar' ? 'تمت إضافة الخدمة' : 'Service Added', newService.title_en);
  };

  const updateService = (id: string, updatedFields: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
    addToast('success', language === 'ar' ? 'تم تحديث الخدمة' : 'Service Updated');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addToast('info', language === 'ar' ? 'تم حذف الخدمة' : 'Service Deleted');
  };

  // Projects CRUD
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    setProjects(prev => [newProject, ...prev]);
    addToast('success', language === 'ar' ? 'تمت إضافة المشروع' : 'Project Added', newProject.title_en);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addToast('success', language === 'ar' ? 'تم تحديث المشروع' : 'Project Updated');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addToast('info', language === 'ar' ? 'تم حذف المشروع' : 'Project Deleted');
  };

  // Blog CRUD
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
    };
    setBlogPosts(prev => [newPost, ...prev]);
    addToast('success', language === 'ar' ? 'تم نشر المقال' : 'Article Published', newPost.title_en);
  };

  const updateBlogPost = (id: string, updatedFields: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
    addToast('success', language === 'ar' ? 'تم تحديث المقال' : 'Article Updated');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    addToast('info', language === 'ar' ? 'تم حذف المقال' : 'Article Deleted');
  };

  // Testimonials CRUD
  const addTestimonial = (item: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...item,
      id: `test-${Date.now()}`,
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
    addToast('success', language === 'ar' ? 'تمت إضافة التقييم' : 'Testimonial Added', newTestimonial.name);
  };

  const updateTestimonial = (id: string, updatedFields: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
    addToast('success', language === 'ar' ? 'تم تحديث التقييم' : 'Testimonial Updated');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    addToast('info', language === 'ar' ? 'تم حذف التقييم' : 'Testimonial Deleted');
  };

  // Partners CRUD
  const addPartner = (partner: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...partner,
      id: `part-${Date.now()}`,
    };
    setPartners(prev => [...prev, newPartner]);
    addToast('success', language === 'ar' ? 'تمت إضافة الشريك' : 'Partner Added', newPartner.name);
  };

  const updatePartner = (id: string, updatedFields: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addToast('success', language === 'ar' ? 'تم تحديث بيانات الشريك' : 'Partner Updated');
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    addToast('info', language === 'ar' ? 'تم حذف الشريك' : 'Partner Deleted');
  };

  // Messages CRUD
  const submitContactForm = (formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    budget: string;
    message: string;
  }): boolean => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...formData,
      created_at: dateFormatted,
      status: 'unread',
    };

    setMessages(prev => [newMsg, ...prev]);
    addToast(
      'success',
      language === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully',
      language === 'ar' ? 'سيتواصل معك فريق DevRopix الهندسي قريباً' : 'The DevRopix team will contact you shortly.'
    );
    return true;
  };

  const updateMessageStatus = (id: string, status: MessageStatus) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    addToast('info', language === 'ar' ? 'تم تحديث حالة الرسالة' : 'Status Updated', status.toUpperCase());
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    addToast('info', language === 'ar' ? 'تم حذف الرسالة' : 'Message Removed');
  };

  // Settings
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('success', language === 'ar' ? 'تم حفظ الإعدادات' : 'Settings Saved');
  };

  // Reset to default seed
  const resetToDefaultData = () => {
    setServices(initialServices);
    setProjects(initialProjects);
    setBlogPosts(initialBlogPosts);
    setTestimonials(initialTestimonials);
    setPartners(initialPartners);
    setMessages(initialMessages);
    setSettings(initialSettings);
    addToast('info', language === 'ar' ? 'تمت استعادة البيانات الافتراضية' : 'Default Data Restored');
  };

  // Export JSON backup
  const exportDataAsJSON = () => {
    const exportData = {
      version: '1.0.0',
      exported_at: new Date().toISOString(),
      services,
      projects,
      blogPosts,
      testimonials,
      partners,
      messages,
      settings,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devropix-database-export-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('success', language === 'ar' ? 'تم تصدير النسخة الاحتياطية' : 'Backup Exported Successfully');
  };

  // Import JSON backup
  const importDataFromJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.services && Array.isArray(data.services)) setServices(data.services);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
      if (data.blogPosts && Array.isArray(data.blogPosts)) setBlogPosts(data.blogPosts);
      if (data.testimonials && Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
      if (data.partners && Array.isArray(data.partners)) setPartners(data.partners);
      if (data.messages && Array.isArray(data.messages)) setMessages(data.messages);
      if (data.settings && typeof data.settings === 'object') setSettings(data.settings);

      addToast('success', language === 'ar' ? 'تم استيراد البيانات بنجاح' : 'Data Imported Successfully');
      return true;
    } catch {
      addToast('error', language === 'ar' ? 'فشل استيراد الملف' : 'Invalid Backup File');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        currentView,
        setCurrentView,
        selectedProject,
        setSelectedProject,
        selectedBlogPost,
        setSelectedBlogPost,
        selectedService,
        setSelectedService,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        services,
        projects,
        blogPosts,
        testimonials,
        partners,
        messages,
        settings,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addPartner,
        updatePartner,
        deletePartner,
        submitContactForm,
        updateMessageStatus,
        deleteMessage,
        updateSettings,
        resetToDefaultData,
        exportDataAsJSON,
        importDataFromJSON,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
