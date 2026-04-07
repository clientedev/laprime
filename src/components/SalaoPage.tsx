import React from 'react';
import { Link } from 'react-router-dom';

const SalaoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-dark to-brand-gold flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Serviços de Salão</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Beleza e cuidado para seus cabelos</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Link to="/" className="inline-flex items-center text-brand-dark hover:text-brand-gold transition-colors mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Home
        </Link>

        <section className="mb-10 md:mb-16">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">O que oferecemos</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed">
            No salão da La Prime, você encontra profissionais especializados em transformar e valorizar seus cabelos. 
            Oferecemos uma gama completa de serviços capilares com produtos de alta qualidade e técnicas modernas.
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Nossos Serviços</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Cortes de Cabelo", desc: "Cortes personalizados que valorizam suas características e estilo pessoal. Nossos profissionais estudam o formato do seu rosto para criar o corte perfeito para você.", items: ["Corte feminino", "Corte masculino", "Corte infantil"] },
              { title: "Coloração e Luzes", desc: "Transforme seu visual com nossas técnicas de coloração. Trabalhamos com produtos de qualidade que cuidam dos fios enquanto proporcionam cores vibrantes e duradouras.", items: ["Coloração completa", "Mechas e luzes", "Balayage e ombré"] },
              { title: "Tratamentos Capilares", desc: "Recupere a saúde e o brilho dos seus cabelos com nossos tratamentos profissionais. Hidratação profunda, reconstrução e nutrição para cabelos danificados.", items: ["Hidratação profunda", "Reconstrução capilar", "Cauterização"] },
              { title: "Escova e Penteados", desc: "Para o dia a dia ou ocasiões especiais, criamos penteados elegantes e escovas impecáveis que realçam sua beleza natural.", items: ["Escova modeladora", "Penteados para eventos", "Penteados para noivas"] },
            ].map((card) => (
              <div key={card.title} className="bg-white p-5 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h4 className="text-lg md:text-2xl font-serif font-semibold text-brand-dark mb-3 md:mb-4">{card.title}</h4>
                <p className="text-sm md:text-base text-brand-text mb-3 md:mb-4">{card.desc}</p>
                <ul className="space-y-1 md:space-y-2 text-brand-text">
                  {card.items.map(item => (
                    <li key={item} className="flex items-start text-sm md:text-base">
                      <span className="text-brand-gold mr-2 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-16 bg-white p-5 md:p-8 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Por que escolher nosso salão?</h3>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "✨", title: "Produtos Premium", desc: "Trabalhamos apenas com produtos profissionais de alta qualidade" },
              { icon: "👩", title: "Profissionais Qualificados", desc: "Equipe constantemente atualizada com as últimas tendências" },
              { icon: "💆", title: "Ambiente Acolhedor", desc: "Espaço confortável e relaxante para seu bem-estar" },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="text-brand-gold text-3xl md:text-5xl mb-3 md:mb-4">{item.icon}</div>
                <h4 className="font-serif font-semibold text-brand-dark mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-brand-text text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-6 sm:p-10 md:p-12 rounded-lg">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Pronta para transformar seu visual?</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende seu horário e venha nos conhecer!</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar um serviço de salão."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-brand-light transition-colors text-sm md:text-lg"
          >
            Agendar Agora
          </a>
        </section>
      </div>
    </div>
  );
};

export default SalaoPage;
