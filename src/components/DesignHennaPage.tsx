import React from 'react';
import { Link } from 'react-router-dom';

const DesignHennaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-dark via-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Design Henna e Tintura</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Sobrancelhas perfeitas e harmoniosas</p>
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
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Realce a Expressão do Seu Olhar</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed">
            A combinação de design profissional com henna ou tintura preenche falhas, define o formato ideal para o seu rosto
            e proporciona um efeito visual marcante e natural. Resultado imediato e duradouro, sem dor.
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Técnicas Disponíveis</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Design com Henna", border: "border-brand-gold", desc: "Aplicação de pigmento natural à base de henna que preenche falhas, define o desenho e dura até 30 dias na pele.", items: ["Preenchimento de falhas", "Cor uniforme e natural", "Duração de até 30 dias na pele", "Indicado para sobrancelhas falhadas"] },
              { title: "Design com Tintura", border: "border-brand-dark", desc: "Coloração específica para os fios, ideal para harmonizar com o tom do cabelo e ressaltar o desenho da sobrancelha.", items: ["Cor intensa nos pelos", "Duração de 2 a 3 semanas", "Variedade de tons disponíveis", "Acabamento natural"] },
              { title: "Design Clássico", border: "border-brand-gold", desc: "Modelagem da sobrancelha respeitando a simetria do rosto, com remoção dos pelos com pinça ou cera.", items: ["Análise visagista do rosto", "Modelagem precisa", "Remoção delicada dos pelos", "Resultado elegante"] },
              { title: "Design + Hidratação", border: "border-brand-dark", desc: "Combinação do design com nutrição dos fios usando óleos vegetais que estimulam o crescimento saudável.", items: ["Estímulo ao crescimento", "Fios mais fortes", "Pele saudável", "Brilho e nutrição"] },
            ].map((card) => (
              <div key={card.title} className={`bg-white p-5 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 ${card.border}`}>
                <h4 className="text-lg md:text-2xl font-serif font-semibold text-brand-dark mb-3 md:mb-4">{card.title}</h4>
                <p className="text-sm md:text-base text-brand-text mb-3 md:mb-4">{card.desc}</p>
                <div className="border-t border-brand-light pt-3 mt-3">
                  <h5 className="font-semibold text-brand-dark mb-2 text-sm md:text-base">Benefícios:</h5>
                  <ul className="space-y-1 md:space-y-2 text-brand-text">
                    {card.items.map(item => (
                      <li key={item} className="flex items-start text-sm md:text-base">
                        <span className="text-brand-gold mr-2 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-16 bg-gradient-to-r from-brand-dark/5 to-brand-gold/5 p-5 md:p-8 rounded-lg">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Como funciona o procedimento</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: "1", title: "Visagismo", desc: "Análise do formato do rosto para definir o desenho ideal" },
              { step: "2", title: "Modelagem", desc: "Limpeza e remoção dos pelos com técnica delicada" },
              { step: "3", title: "Pigmentação", desc: "Aplicação da henna ou tintura escolhida" },
              { step: "4", title: "Finalização", desc: "Hidratação e orientações de cuidado" },
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Pronta para um olhar marcante?</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende seu design e descubra a melhor técnica para você.</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar um design de sobrancelha com henna ou tintura."
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

export default DesignHennaPage;
