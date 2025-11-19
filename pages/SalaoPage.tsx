import React from 'react';
import { Link } from 'react-router-dom';

const SalaoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-96 bg-gradient-to-r from-brand-dark to-brand-gold flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Serviços de Salão</h1>
          <p className="text-xl md:text-2xl font-light">Beleza e cuidado para seus cabelos</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/" className="inline-flex items-center text-brand-dark hover:text-brand-gold transition-colors mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Home
        </Link>

        <section className="mb-16">
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">O que oferecemos</h2>
          <p className="text-lg text-brand-text leading-relaxed mb-8">
            No salão da La Prime, você encontra profissionais especializados em transformar e valorizar seus cabelos. 
            Oferecemos uma gama completa de serviços capilares com produtos de alta qualidade e técnicas modernas.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Cortes de Cabelo</h4>
              <p className="text-brand-text mb-4">
                Cortes personalizados que valorizam suas características e estilo pessoal. 
                Nossos profissionais estudam o formato do seu rosto para criar o corte perfeito para você.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Corte feminino</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Corte masculino</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Corte infantil</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Coloração e Luzes</h4>
              <p className="text-brand-text mb-4">
                Transforme seu visual com nossas técnicas de coloração. Trabalhamos com produtos de qualidade 
                que cuidam dos fios enquanto proporcionam cores vibrantes e duradouras.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Coloração completa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Mechas e luzes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Balayage e ombré</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Tratamentos Capilares</h4>
              <p className="text-brand-text mb-4">
                Recupere a saúde e o brilho dos seus cabelos com nossos tratamentos profissionais. 
                Hidratação profunda, reconstrução e nutrição para cabelos danificados.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Hidratação profunda</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Reconstrução capilar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Cauterização</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Escova e Penteados</h4>
              <p className="text-brand-text mb-4">
                Para o dia a dia ou ocasiões especiais, criamos penteados elegantes e escovas impecáveis 
                que realçam sua beleza natural.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Escova modeladora</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Penteados para eventos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Penteados para noivas</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Por que escolher nosso salão?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-brand-gold text-5xl mb-4">✨</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Produtos Premium</h4>
              <p className="text-brand-text">Trabalhamos apenas com produtos profissionais de alta qualidade</p>
            </div>
            <div className="text-center">
              <div className="text-brand-gold text-5xl mb-4">👩</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Profissionais Qualificados</h4>
              <p className="text-brand-text">Equipe constantemente atualizada com as últimas tendências</p>
            </div>
            <div className="text-center">
              <div className="text-brand-gold text-5xl mb-4">💆</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Ambiente Acolhedor</h4>
              <p className="text-brand-text">Espaço confortável e relaxante para seu bem-estar</p>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-12 rounded-lg">
          <h3 className="text-3xl font-serif font-bold mb-4">Pronta para transformar seu visual?</h3>
          <p className="text-xl mb-8">Agende seu horário e venha nos conhecer!</p>
          <a 
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar um serviço de salão." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-brand-light transition-colors text-lg"
          >
            Agendar Agora
          </a>
        </section>
      </div>
    </div>
  );
};

export default SalaoPage;
