import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedTreatments from '../components/FeaturedTreatments';
import TeamSection from '../components/TeamSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

interface HomePageProps {
  aboutRef: React.RefObject<HTMLDivElement>;
  servicesRef: React.RefObject<HTMLDivElement>;
  testimonialsRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
}

const HomePage: React.FC<HomePageProps> = ({ aboutRef, servicesRef, testimonialsRef, contactRef }) => {
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div id="home">
        <Hero onNavigate={scrollToContact} />
      </div>
      <div id="about" ref={aboutRef}>
        <AboutSection />
      </div>
      <div id="services" ref={servicesRef}>
        <ServicesSection />
      </div>
      <FeaturedTreatments />
      <TeamSection />
      <div id="testimonials" ref={testimonialsRef}>
        <TestimonialsSection />
      </div>
      <div id="contact" ref={contactRef}>
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
