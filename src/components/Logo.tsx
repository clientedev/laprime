import React from 'react';
import logoImg from '/logo.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'w-36 h-auto' }) => (
  <div className={className}>
    <img src={logoImg} alt="La Prime - Universo da Beleza" className="w-full h-full object-contain" />
  </div>
);

export default Logo;
