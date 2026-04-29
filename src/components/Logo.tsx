import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'w-36 h-auto' }) => (
  <div className={className}>
    <img src={logoImg} alt="La Dinie - Universo da Beleza" className="w-full h-full object-contain" />
  </div>
);

export default Logo;
