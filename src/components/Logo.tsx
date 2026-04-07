import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'w-36 h-auto' }) => (
  <div className={className}>
    <img src="/logo-v3.png" alt="La Prime - Universo da Beleza" className="w-full h-full object-contain" />
  </div>
);

export default Logo;
