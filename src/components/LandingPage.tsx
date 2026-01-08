import React from 'react';
import { Calendar, Clock, Scissors, Star, ShieldCheck, MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="font-sans text-brand-text">
      {/* Hero Section */}
      <section className="relative py-20 bg-brand-light overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark leading-tight">
              Sua beleza merece o <span className="text-brand-gold">melhor cuidado.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Na La Prime, unimos tecnologia avançada e profissionais especializados para transformar sua autoestima em um ambiente acolhedor e exclusivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register" className="bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg text-center">
                Começar Agora
              </Link>
              <Link to="/login" className="border-2 border-brand-dark text-brand-dark px-8 py-4 rounded-full font-bold hover:bg-brand-dark hover:text-white transition-all text-center">
                Acessar Minha Conta
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-full h-[500px] bg-brand-gold bg-opacity-20 rounded-2xl overflow-hidden relative shadow-2xl">
               <img src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=1000" alt="Estética" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4 border border-gray-100">
               <div className="bg-green-100 p-3 rounded-full">
                 <ShieldCheck className="w-6 h-6 text-green-600" />
               </div>
               <div>
                 <p className="font-bold text-brand-dark text-sm">Ambiente Seguro</p>
                 <p className="text-xs text-gray-500">Protocolos rigorosos</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Nossos Universos</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto mb-6"></div>
            <p className="text-gray-600">Oferecemos soluções completas para sua saúde e bem-estar em um só lugar.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Estética Avançada", icon: <Star />, desc: "Harmonização, toxina botulínica e tratamentos faciais/corporais de última geração." },
              { title: "Salão & Spa", icon: <Scissors />, desc: "Cortes exclusivos, coloração premium e rituais de cuidado capilar." },
              { title: "Odontologia", icon: <ShieldCheck />, desc: "Sorriso renovado com facetas, clareamento e reabilitação estética." }
            ].map((service, idx) => (
              <div key={idx} className="p-8 bg-brand-light rounded-2xl border border-transparent hover:border-brand-gold transition-all group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-white transition-all">
                  {React.cloneElement(service.icon as React.ReactElement, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-brand-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <h3 className="text-3xl font-black tracking-tighter">LA PRIME</h3>
              <p className="text-gray-400 max-w-sm">Onde a tecnologia encontra o cuidado humano para elevar sua essência.</p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-brand-gold transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-brand-gold transition-all"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-brand-gold">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (11) 9999-9999</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> São Paulo, SP</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-brand-gold">Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-brand-gold transition-colors">Acessar Sistema</Link></li>
                <li><Link to="/register" className="hover:text-brand-gold transition-colors">Criar Conta</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white border-opacity-10 text-center text-gray-500 text-sm">
            © 2026 La Prime Saúde e Bem Estar. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
