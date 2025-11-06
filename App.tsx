
import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import FeaturedTreatments from './components/FeaturedTreatments';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    testimonials: testimonialsRef,
    contact: contactRef,
  };

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <Header onNavigate={scrollToSection} />
      <main>
        <div ref={homeRef}>
          <Hero onNavigate={() => scrollToSection('contact')} />
        </div>
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={servicesRef}>
          <ServicesSection />
        </div>
        <FeaturedTreatments />
        <div ref={testimonialsRef}>
          <TestimonialsSection />
        </div>
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
