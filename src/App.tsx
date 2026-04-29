import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ClientDashboard from './components/ClientDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import Header from './components/Header';
import UnhasPage from './components/UnhasPage';
import EsteticaPage from './components/EsteticaPage';
import OdontologiaPage from './components/OdontologiaPage';
import SpaPage from './components/SpaPage';
import ReconstrucaoPage from './components/ReconstrucaoPage';
import DesignHennaPage from './components/DesignHennaPage';
import BrowLaminationPage from './components/BrowLaminationPage';
import LiftingPage from './components/LiftingPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import GalleryPage from './components/GalleryPage';
import PromotionBanner from './components/PromotionBanner';
import BinaChatbot from './components/BinaChatbot';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const aboutRef = React.useRef(null);
  const servicesRef = React.useRef(null);
  const testimonialsRef = React.useRef(null);
  const contactRef = React.useRef(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <BinaChatbot />
      <Header user={user} onLogout={handleLogout} onNavigate={scrollToSection} />
      <div className="min-h-screen bg-brand-light font-sans text-brand-text w-full overflow-x-hidden">
        <Suspense fallback={<div className="p-20 text-center font-serif text-2xl text-brand-dark italic">Carregando experiência La Dinie...</div>}>
          <Routes>
            <Route path="/" element={<HomePage aboutRef={aboutRef} servicesRef={servicesRef} testimonialsRef={testimonialsRef} contactRef={contactRef} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/servicos/unhas" element={<UnhasPage />} />
            <Route path="/servicos/estetica" element={<EsteticaPage />} />
            <Route path="/servicos/odontologia" element={<OdontologiaPage />} />
            <Route path="/servicos/spa" element={<SpaPage />} />
            <Route path="/servicos/reconstrucao" element={<ReconstrucaoPage />} />
            <Route path="/servicos/design-henna" element={<DesignHennaPage />} />
            <Route path="/servicos/brow-lamination" element={<BrowLaminationPage />} />
            <Route path="/servicos/lifting" element={<LiftingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  user.role === 'ADMIN' ? <AdminDashboard /> :
                    user.role === 'PROFISSIONAL' ? <ProfessionalDashboard /> :
                      <div className="pt-20 px-0"><ClientDashboard /></div>
                ) : <Navigate to="/login" />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
