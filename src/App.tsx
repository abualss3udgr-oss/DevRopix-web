import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Public Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProjectModal } from './components/common/ProjectModal';
import { BlogModal } from './components/common/BlogModal';
import { ToastContainer } from './components/common/ToastContainer';

// Home Page Sections
import { HeroSection } from './components/home/HeroSection';
import { PartnersMarquee } from './components/home/PartnersMarquee';
import { ServicesSection } from './components/home/ServicesSection';
import { WhyDevRopix } from './components/home/WhyDevRopix';
import { FeaturedProjects } from './components/home/FeaturedProjects';
import { ProcessSection } from './components/home/ProcessSection';
import { AboutSection } from './components/home/AboutSection';
import { StatsSection } from './components/home/StatsSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { BlogSection } from './components/home/BlogSection';
import { CtaSection } from './components/home/CtaSection';

// Inner Pages
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { AboutPage } from './components/pages/AboutPage';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminServices } from './components/admin/AdminServices';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminBlog } from './components/admin/AdminBlog';
import { AdminTestimonials } from './components/admin/AdminTestimonials';
import { AdminPartners } from './components/admin/AdminPartners';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminSettings } from './components/admin/AdminSettings';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, isAdminLoggedIn } = useApp();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Admin Route Handling
  const isAdminRoute = currentView.startsWith('admin');

  if (isAdminRoute) {
    if (currentView === 'admin-login') {
      return (
        <>
          <AdminLogin />
          <ToastContainer />
        </>
      );
    }

    if (!isAdminLoggedIn) {
      return (
        <>
          <AdminLogin />
          <ToastContainer />
        </>
      );
    }

    return (
      <AdminLayout>
        {currentView === 'admin-overview' && <AdminOverview />}
        {currentView === 'admin-services' && <AdminServices />}
        {currentView === 'admin-projects' && <AdminProjects />}
        {currentView === 'admin-blog' && <AdminBlog />}
        {currentView === 'admin-testimonials' && <AdminTestimonials />}
        {currentView === 'admin-partners' && <AdminPartners />}
        {currentView === 'admin-messages' && <AdminMessages />}
        {currentView === 'admin-settings' && <AdminSettings />}
        <ToastContainer />
      </AdminLayout>
    );
  }

  // Public Website Render
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className={`flex-1 ${currentView === 'home' ? '' : 'pt-18 sm:pt-20'}`}>
        {currentView === 'home' && (
          <>
            <HeroSection />
            <PartnersMarquee />
            <ServicesSection />
            <WhyDevRopix />
            <FeaturedProjects />
            <ProcessSection />
            <AboutSection />
            <StatsSection />
            <TestimonialsSection />
            <BlogSection />
            <CtaSection />
          </>
        )}

        {currentView === 'services' && <ServicesPage />}
        {currentView === 'projects' && <ProjectsPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'blog' && <BlogPage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <ProjectModal />
      <BlogModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
