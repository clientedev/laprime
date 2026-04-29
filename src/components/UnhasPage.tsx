import React from 'react';
import { Link } from 'react-router-dom';

const UnhasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Manicure e Pedicure</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Unhas perfeitas e bem cuidadas</p>
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
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Cuidado Completo para suas Unhas</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed">
            Na La Dinie, suas unhas recebem cuidado profissional com técnicas modernas e produtos de alta qualidade. 
            Nossa equipe é especializada em deixar suas mãos e pés impecáveis, elevando sua autoestima e bem-estar.
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Nossos Serviços</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Alongamento de Unhas", desc: "Unhas longas e perfeitas com técnicas modernas e materiais de qualidade superior. Durabilidade e beleza para você arrasar por semanas.", items: ["Fibra de Vidro - resistente e natural", "Gel - brilho duradouro e flexível", "Acrílico - máxima resistência", "Porcelana - acabamento refinado"] },
              { title: "Esmaltação em Gel", desc: "Esmalte que dura até 3 semanas com brilho impecável. Secagem instantânea sob luz LED e cores vibrantes que não descascam.", items: ["Durabilidade de 15 a 21 dias", "Brilho intenso e duradouro", "Secagem rápida em cabine LED", "Variedade de cores e acabamentos"] },
              { title: "Manicure Russa", desc: "Técnica europeia de alta precisão que proporciona cutículas perfeitas e unhas impecáveis. Resultado profissional que dura muito mais tempo.", items: ["Remoção precisa de cutículas", "Acabamento impecável", "Maior durabilidade do esmalte", "Técnica com brocas especializadas"] },
              { title: "Nail Art & Decorações", desc: "Deixe suas unhas únicas com designs artísticos personalizados. De pedrarias a desenhos delicados, criamos a arte perfeita para você.", items: ["Desenhos artísticos", "Aplicação de pedrarias", "Francesinhas modernas", "Efeitos especiais (glitter, degradê)"] },
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

        <section className="mb-10 md:mb-16 bg-gradient-to-r from-brand-dark/5 to-brand-gold/5 p-5 md:p-8 rounded-lg">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Tratamentos Especiais</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: "Blindagem de Unhas", desc: "Fortalecimento das unhas naturais com vitaminas e proteínas. Ideal para quem tem unhas frágeis ou deseja estimular o crescimento saudável." },
              { title: "Spa de Mãos e Pés", desc: "Tratamento completo com esfoliação, hidratação profunda e massagem relaxante. Suas mãos e pés merecem esse mimo especial!" },
            ].map(item => (
              <div key={item.title} className="bg-white p-4 md:p-6 rounded-lg">
                <h4 className="font-serif font-semibold text-brand-dark mb-2 text-base md:text-xl">{item.title}</h4>
                <p className="text-brand-text text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Por que escolher a La Dinie?</h3>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "💅", title: "Materiais Premium", desc: "Produtos importados e de alta qualidade para resultados superiores" },
              { icon: "⏱️", title: "Durabilidade", desc: "Técnicas profissionais garantem unhas lindas por mais tempo" },
              { icon: "🎨", title: "Criatividade", desc: "Designs personalizados para expressar seu estilo único" },
            ].map(item => (
              <div key={item.title} className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
                <div className="text-brand-gold text-3xl md:text-5xl mb-3 md:mb-4">{item.icon}</div>
                <h4 className="font-serif font-semibold text-brand-dark mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-brand-text text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-gold to-brand-dark text-white p-6 sm:p-10 md:p-12 rounded-lg">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Pronta para unhas impecáveis?</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende seu horário e venha se cuidar!</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar um serviço de manicure/pedicure."
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

export default UnhasPage;
