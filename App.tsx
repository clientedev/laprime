
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import SalaoPage from './pages/SalaoPage';
import UnhasPage from './pages/UnhasPage';
import CiliosPage from './pages/CiliosPage';
import EsteticaPage from './pages/EsteticaPage';
import OdontologiaPage from './pages/OdontologiaPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    home: { current: null } as React.RefObject<HTMLDivElement>,
    about: aboutRef,
    services: servicesRef,
    testimonials: testimonialsRef,
    contact: contactRef,
  };

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${section}`;
    } else {
      sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <Header onNavigate={scrollToSection} />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                aboutRef={aboutRef}
                servicesRef={servicesRef}
                testimonialsRef={testimonialsRef}
                contactRef={contactRef}
              />
            } 
          />
          <Route path="/servicos/salao" element={<SalaoPage />} />
          <Route path="/servicos/unhas" element={<UnhasPage />} />
          <Route path="/servicos/cilios" element={<CiliosPage />} />
          <Route path="/servicos/estetica" element={<EsteticaPage />} />
          <Route path="/servicos/odontologia" element={<OdontologiaPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
