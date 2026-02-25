import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { LayoutDashboard, LogOut } from 'lucide-react';
import PromotionBanner from './PromotionBanner';

interface HeaderProps {
  user?: { email: string; role: string } | null;
  onLogout?: () => void;
  onNavigate: (section: 'home' | 'about' | 'services' | 'testimonials' | 'contact') => void;
}

const NavLink: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-white uppercase tracking-wider font-sans text-sm hover:text-brand-gold transition-colors duration-300"
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', section: 'home' as const },
    { label: 'Sobre', section: 'about' as const },
    { label: 'Serviços', section: 'services' as const },
    { label: 'Depoimentos', section: 'testimonials' as const },
    { label: 'Contato', section: 'contact' as const },
  ];

  const handleNavClick = (section: any) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => onNavigate(section), 100);
    } else {
      onNavigate(section);
    }
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-brand-dark shadow-lg' : 'bg-brand-dark/0'}`}>
      <PromotionBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <Logo className="w-28 text-brand-gold" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map(item => (
              <NavLink key={item.section} onClick={() => handleNavClick(item.section)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/blog" className="text-white uppercase tracking-wider font-sans text-sm hover:text-brand-gold transition-colors duration-300">Blog</Link>
            <Link to="/galeria" className="text-white uppercase tracking-wider font-sans text-sm hover:text-brand-gold transition-colors duration-300">Galeria</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-white hover:text-brand-gold flex items-center gap-2 text-sm font-semibold">
                  <LayoutDashboard className="w-4 h-4" />
                  Painel
                </Link>
                <div className="h-4 w-px bg-gray-600" />
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Olá,</span>
                    <span className="text-xs font-bold text-white leading-none">{user.email.split('@')[0]}</span>
                  </div>
                  <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-white hover:text-brand-gold text-sm font-semibold">Entrar</Link>
                <Link
                  to="/register"
                  className="bg-brand-gold text-brand-dark font-sans font-semibold py-2 px-6 rounded-full hover:bg-opacity-80 transition-all duration-300"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-sm absolute top-20 left-0 right-0">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navItems.map(item => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-gold hover:text-brand-dark w-full text-center"
              >
                {item.label}
              </button>
            ))}
            <Link to="/blog" onClick={() => setIsOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-gold hover:text-brand-dark w-full text-center">Blog</Link>
            <Link to="/galeria" onClick={() => setIsOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-gold hover:text-brand-dark w-full text-center">Galeria</Link>
            {user ? (
              <div className="w-full pt-4 border-t border-gray-700 flex flex-col items-center gap-4">
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-white font-bold">Painel de Controle</Link>
                <button onClick={() => { onLogout?.(); setIsOpen(false); }} className="text-red-400 font-bold">Sair</button>
              </div>
            ) : (
              <div className="w-full pt-4 border-t border-gray-700 flex flex-col items-center gap-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-white font-bold">Entrar</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="bg-brand-gold text-brand-dark font-bold py-2 px-8 rounded-full">Cadastrar</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
