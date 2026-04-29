import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-16 w-auto' }) => (
  <img src={logoImg} alt="La Dinie - Universo da Beleza" className={`${className} object-contain`} />
);

export default Logo;
