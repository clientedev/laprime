import React from 'react';

interface HeroProps {
  onNavigate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1920&auto=format&fit=crop" alt="Mulher serena recebendo tratamento de spa" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="relative z-20 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight mb-4 animate-fade-in-down">
          Autocuidado e bem-estar em um só lugar.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 font-sans font-light animate-fade-in-up">
          Na La Prime, você encontra estética, odontologia e beleza com qualidade e conforto.
        </p>
        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="bg-brand-gold text-brand-dark font-sans font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 duration-300 animate-fade-in-up">
          Agendar Agora (WhatsApp)
        </a>
      </div>
    </section>
  );
};

export default Hero;
