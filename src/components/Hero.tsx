import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConversationalAppointment from './ConversationalAppointment';

interface HeroProps {
  onNavigate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1920&auto=format&fit=crop"
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAppointment, setShowAppointment] = useState(false);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await axios.get('/api/settings/hero_images');
        if (response.data && response.data.value) {
          const parsed = JSON.parse(response.data.value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setImages(parsed);
          }
        }
      } catch (error) {
        console.log("Using default hero images");
      }
    };
    fetchHeroImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center text-center text-white pt-20 overflow-hidden">
        {/* Carousel Images */}
        {images.map((url, idx) => (
          <div
            key={url + idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
            <img
              src={url}
              alt={`Transformação La Prime ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
          </div>
        ))}

        <div className="relative z-20 px-4 max-w-6xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight mb-4 animate-fade-in-down drop-shadow-2xl">
            Autocuidado e bem-estar em um só lugar.
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 font-sans font-light animate-fade-in-up drop-shadow-md">
            Na La Prime, você encontra estética, odontologia e beleza com qualidade e conforto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <button
              onClick={() => setShowAppointment(true)}
              className="bg-brand-gold text-brand-dark font-sans font-bold py-4 px-10 rounded-full text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 duration-300 shadow-xl hover:shadow-brand-gold/20 active:scale-95 relative overflow-hidden group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Agendar Agora ✨
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button
              onClick={() => onNavigate()}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans font-bold py-4 px-10 rounded-full text-lg hover:bg-white/20 transition-all transform hover:scale-105 duration-300 active:scale-95 w-full sm:w-auto"
            >
              Conhecer Serviços
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-brand-gold w-8' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {showAppointment && (
        <ConversationalAppointment onClose={() => setShowAppointment(false)} />
      )}
    </>
  );
};

export default Hero;
