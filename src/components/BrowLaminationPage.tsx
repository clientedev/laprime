import React from 'react';
import { Link } from 'react-router-dom';

const BrowLaminationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Brow Lamination</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Sobrancelhas alinhadas, volumosas e cheias</p>
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
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">A Tendência das Sobrancelhas Volumosas</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed">
            O Brow Lamination é uma técnica que alinha e fixa os pelos da sobrancelha em uma direção uniforme,
            criando o efeito de sobrancelhas mais cheias, levantadas e bem definidas. Resultado natural e marcante
            que dura de 4 a 8 semanas, sem necessidade de manutenção diária.
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">O que o Brow Lamination Resolve</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Pelos Rebeldes", desc: "Disciplina os fios que crescem em direções diferentes, deixando a sobrancelha alinhada e organizada o tempo todo.", items: ["Fios fixados na direção certa", "Aspecto sempre arrumado", "Sem precisar pentear", "Dispensa fixadores diários"] },
              { title: "Sobrancelhas Falhadas", desc: "O alinhamento dos fios cobre falhas naturais e cria a aparência de sobrancelhas mais densas e preenchidas.", items: ["Efeito de maior densidade", "Cobertura visual de falhas", "Resultado natural", "Visual mais jovem"] },
              { title: "Formato Pouco Definido", desc: "Define o desenho da sobrancelha realçando o arco e proporcionando um look mais expressivo e harmonioso.", items: ["Arco bem definido", "Visagismo personalizado", "Harmonia facial", "Olhar mais aberto"] },
              { title: "Combinação com Tintura", desc: "Pode ser combinado com a aplicação de tintura para potencializar o efeito de sobrancelhas perfeitas e duradouras.", items: ["Cor uniforme nos fios", "Resultado mais marcante", "Duração otimizada", "Look completo em uma sessão"] },
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
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Cuidados Pós-Procedimento</h3>
          <div className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {[
                "Não molhar a região nas primeiras 24 horas",
                "Evitar saunas e calor excessivo por 48 horas",
                "Aplicar óleo nutritivo diariamente",
                "Não usar maquiagem na região por 24 horas",
                "Pentear os fios diariamente com escovinha",
                "Retoque sugerido a cada 6 a 8 semanas",
              ].map(item => (
                <li key={item} className="flex items-start">
                  <span className="text-brand-gold mr-3 text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-brand-text text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-gold to-brand-dark text-white p-6 sm:p-10 md:p-12 rounded-lg">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Sobrancelhas dos seus sonhos</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende sua sessão de Brow Lamination agora.</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar um Brow Lamination."
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

export default BrowLaminationPage;
