import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
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

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo className="w-28 text-brand-gold" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map(item => (
              <NavLink key={item.section} onClick={() => onNavigate(item.section)}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="bg-brand-gold text-brand-dark font-sans font-semibold py-2 px-6 rounded-full hover:bg-opacity-80 transition-all duration-300">
              Agendar Agora
            </a>
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
                onClick={() => {
                  onNavigate(item.section);
                  setIsOpen(false);
                }}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-gold hover:text-brand-dark w-full text-center"
              >
                {item.label}
              </button>
            ))}
             <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="mt-4 bg-brand-gold text-brand-dark font-sans font-semibold py-2 px-6 rounded-full hover:bg-opacity-80 transition-all duration-300 w-fit">
              Agendar Agora
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
