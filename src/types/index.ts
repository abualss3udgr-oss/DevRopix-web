export type Language = 'en' | 'ar';

export type PublicPage = 'home' | 'services' | 'projects' | 'about' | 'blog' | 'contact';
export type AdminPage = 
  | 'admin-overview' 
  | 'admin-services' 
  | 'admin-projects' 
  | 'admin-blog' 
  | 'admin-testimonials' 
  | 'admin-partners' 
  | 'admin-messages' 
  | 'admin-settings'
  | 'admin-login';

export type AdminView = AdminPage;

export type CurrentView = PublicPage | AdminPage;

export interface Service {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  description_en: string;
  description_ar: string;
  icon: string;
  image?: string;
  features_en: string[];
  features_ar: string[];
  technologies: string[];
  sort_order: number;
  published: boolean;
}

export interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  description_en: string;
  description_ar: string;
  category: 'Websites' | 'Mobile Apps' | 'UI/UX' | 'Software' | 'Platforms';
  category_ar: string;
  client: string;
  year: string;
  technologies: string[];
  main_image: string;
  gallery: string[];
  project_url?: string;
  featured: boolean;
  published: boolean;
}

export interface BlogPost {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  content_en: string;
  content_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  category: string;
  category_ar: string;
  featured_image: string;
  author: string;
  author_role: string;
  published_date: string;
  read_time: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  avatar: string;
  content_en: string;
  content_ar: string;
  rating: number;
  published: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  sort_order: number;
  active: boolean;
}

export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  created_at: string;
  status: MessageStatus;
  read?: boolean;
}

export interface Settings {
  company_name: string;
  company_name_ar: string;
  tagline_en: string;
  tagline_ar: string;
  email: string;
  phone: string;
  whatsapp: string;
  address_en: string;
  address_ar: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  github: string;
  default_title: string;
  default_description: string;
  og_image: string;
  stats_projects: number;
  stats_clients: number;
  stats_years: number;
  stats_technologies: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  avatar: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  message?: string;
}
