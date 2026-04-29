import React from 'react';
import { Link } from 'react-router-dom';

const LiftingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-dark via-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Lash Lifting</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Cílios curvados, longos e marcantes</p>
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
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Realce Natural do Olhar</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed">
            O Lash Lifting é uma técnica que curva permanentemente os cílios naturais, dando a sensação de cílios mais longos
            e levantados. Sem aplicação de fios, o procedimento valoriza o que é seu, com resultado natural que dura de 6 a 8 semanas.
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Por que escolher o Lash Lifting?</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Curvatura Duradoura", desc: "Levanta os cílios naturais com curvatura definida que se mantém por 6 a 8 semanas, sem manutenção semanal.", items: ["Curvatura uniforme", "Efeito imediato", "Duração de 6 a 8 semanas", "Sem necessidade de retoque"] },
              { title: "100% Natural", desc: "Diferente das extensões, trabalha apenas com os seus próprios cílios. Resultado leve e sem peso adicional.", items: ["Sem aplicação de fios", "Não danifica os cílios", "Visual natural e suave", "Liberdade no dia a dia"] },
              { title: "Combinação com Tintura", desc: "Pode ser combinado com tintura dos cílios para um resultado ainda mais marcante, dispensando totalmente a máscara.", items: ["Cílios escurecidos", "Visual marcante sem maquiagem", "Olhar mais expressivo", "Economia de tempo na rotina"] },
              { title: "Indicado para Todos os Tipos", desc: "Perfeito para quem tem cílios longos mas retos, ou para quem busca um look natural sem o compromisso das extensões.", items: ["Cílios retos ou descaídos", "Quem evita extensões", "Pré-eventos e viagens", "Praticidade no dia a dia"] },
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
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Etapas da Aplicação</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: "1", title: "Higienização", desc: "Limpeza completa dos cílios e da área dos olhos" },
              { step: "2", title: "Modelagem", desc: "Aplicação dos silicones que definem a curvatura" },
              { step: "3", title: "Permanente", desc: "Aplicação dos ativos que fixam o formato" },
              { step: "4", title: "Nutrição", desc: "Finalização com queratina e óleo nutritivo" },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="bg-brand-gold text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-2xl font-bold mx-auto mb-3 md:mb-4">{item.step}</div>
                <h4 className="font-serif font-semibold text-brand-dark mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-brand-text text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-6 sm:p-10 md:p-12 rounded-lg">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Realce o seu olhar natural</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende seu Lash Lifting e veja a diferença.</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar um Lash Lifting."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-brand-light transition-colors text-sm md:text-lg"
          >
            Agendar Sessão
          </a>
        </section>
      </div>
    </div>
  );
};

export default LiftingPage;
