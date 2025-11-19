import React from 'react';
import { Link } from 'react-router-dom';

const UnhasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-96 bg-gradient-to-r from-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Manicure e Pedicure</h1>
          <p className="text-xl md:text-2xl font-light">Unhas perfeitas e bem cuidadas</p>
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
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Cuidado Completo para suas Unhas</h2>
          <p className="text-lg text-brand-text leading-relaxed mb-8">
            Na La Prime, suas unhas recebem cuidado profissional com técnicas modernas e produtos de alta qualidade. 
            Nossa equipe é especializada em deixar suas mãos e pés impecáveis, elevando sua autoestima e bem-estar.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Alongamento de Unhas</h4>
              <p className="text-brand-text mb-4">
                Unhas longas e perfeitas com técnicas modernas e materiais de qualidade superior. 
                Durabilidade e beleza para você arrasar por semanas.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Fibra de Vidro - resistente e natural</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Gel - brilho duradouro e flexível</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Acrílico - máxima resistência</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Porcelana - acabamento refinado</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Esmaltação em Gel</h4>
              <p className="text-brand-text mb-4">
                Esmalte que dura até 3 semanas com brilho impecável. Secagem instantânea sob luz LED 
                e cores vibrantes que não descascam.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Durabilidade de 15 a 21 dias</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Brilho intenso e duradouro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Secagem rápida em cabine LED</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Variedade de cores e acabamentos</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Manicure Russa</h4>
              <p className="text-brand-text mb-4">
                Técnica europeia de alta precisão que proporciona cutículas perfeitas e unhas impecáveis. 
                Resultado profissional que dura muito mais tempo.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Remoção precisa de cutículas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Acabamento impecável</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Maior durabilidade do esmalte</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Técnica com brocas especializadas</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Nail Art & Decorações</h4>
              <p className="text-brand-text mb-4">
                Deixe suas unhas únicas com designs artísticos personalizados. 
                De pedrarias a desenhos delicados, criamos a arte perfeita para você.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Desenhos artísticos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Aplicação de pedrarias</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Francesinhas modernas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Efeitos especiais (glitter, degradê)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-brand-dark/5 to-brand-gold/5 p-8 rounded-lg">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Tratamentos Especiais</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3 text-xl">Blindagem de Unhas</h4>
              <p className="text-brand-text">
                Fortalecimento das unhas naturais com vitaminas e proteínas. Ideal para quem tem unhas frágeis 
                ou deseja estimular o crescimento saudável.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3 text-xl">Spa de Mãos e Pés</h4>
              <p className="text-brand-text">
                Tratamento completo com esfoliação, hidratação profunda e massagem relaxante. 
                Suas mãos e pés merecem esse mimo especial!
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Por que escolher a La Prime?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">💅</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Materiais Premium</h4>
              <p className="text-brand-text">Produtos importados e de alta qualidade para resultados superiores</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">⏱️</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Durabilidade</h4>
              <p className="text-brand-text">Técnicas profissionais garantem unhas lindas por mais tempo</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">🎨</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Criatividade</h4>
              <p className="text-brand-text">Designs personalizados para expressar seu estilo único</p>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-gold to-brand-dark text-white p-12 rounded-lg">
          <h3 className="text-3xl font-serif font-bold mb-4">Pronta para unhas impecáveis?</h3>
          <p className="text-xl mb-8">Agende seu horário e venha se cuidar!</p>
          <a 
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar um serviço de manicure/pedicure." 
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

export default UnhasPage;
