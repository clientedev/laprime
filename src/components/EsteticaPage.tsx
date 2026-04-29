import React from 'react';
import { Link } from 'react-router-dom';

const EsteticaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Estética Facial e Corporal</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Tecnologia e cuidado para sua pele</p>
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
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Tratamentos Estéticos Avançados</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed mb-6 md:mb-8">
            Na La Dinie, combinamos tecnologia de ponta com técnicas especializadas para cuidar da sua pele. 
            Nossos tratamentos faciais e corporais são personalizados para atender suas necessidades específicas, 
            promovendo beleza, saúde e bem-estar.
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Tratamentos Faciais</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Limpeza de Pele Profunda", desc: "Procedimento completo para remover impurezas, cravos e células mortas. Sua pele fica renovada, hidratada e com aspecto saudável.", items: ["Remoção profunda de impurezas", "Extração de cravos e comedões", "Hidratação e revitalização", "Máscara específica para seu tipo de pele"] },
              { title: "Peeling Químico", desc: "Renovação celular através de ácidos que removem camadas superficiais da pele. Reduz manchas, melhora textura e promove o rejuvenescimento.", items: ["Clareamento de manchas", "Renovação da pele", "Melhora da textura", "Estímulo de colágeno"] },
              { title: "Microagulhamento", desc: "Técnica que estimula a produção natural de colágeno através de microlesões controladas. Excelente para rejuvenescimento, cicatrizes e estrias.", items: ["Rejuvenescimento facial", "Redução de linhas de expressão", "Melhora de cicatrizes de acne", "Aumento da firmeza da pele"] },
              { title: "Radiofrequência Facial", desc: "Tecnologia que aquece as camadas profundas da pele, estimulando colágeno e elastina. Lifting não invasivo para combater flacidez.", items: ["Efeito lifting imediato", "Redução de flacidez", "Contorno facial definido", "Sem tempo de recuperação"] },
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

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Tratamentos Corporais</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Drenagem Linfática", desc: "Massagem terapêutica que estimula o sistema linfático, reduzindo retenção de líquidos e promovendo desintoxicação.", items: ["Redução de inchaço e retenção", "Melhora da circulação", "Desintoxicação do organismo", "Alívio de pernas cansadas"] },
              { title: "Criolipólise", desc: "Tecnologia que congela e elimina células de gordura localizada de forma não invasiva. Redução de medidas sem cirurgia.", items: ["Eliminação de gordura localizada", "Procedimento não invasivo", "Resultados visíveis em semanas", "Sem tempo de recuperação"] },
              { title: "Radiofrequência Corporal", desc: "Combate à flacidez e celulite através do aquecimento profundo dos tecidos. Corpo mais firme e contornado.", items: ["Firmeza da pele", "Redução de celulite", "Melhora do contorno corporal", "Estímulo de colágeno"] },
              { title: "Massagem Modeladora", desc: "Técnica intensa que quebra nódulos de gordura e melhora a circulação. Aliada perfeita na redução de medidas e celulite.", items: ["Quebra de gordura localizada", "Melhora da celulite", "Tonificação muscular", "Resultados progressivos"] },
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
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Tratamentos Complementares</h3>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Depilação a Laser", desc: "Remoção permanente de pelos com tecnologia avançada e segura." },
              { title: "Design de Sobrancelhas", desc: "Modelagem perfeita para harmonizar seu rosto." },
              { title: "Micropigmentação", desc: "Sobrancelhas perfeitas 24 horas por dia com técnica fio a fio." },
            ].map(item => (
              <div key={item.title} className="bg-white p-4 md:p-6 rounded-lg">
                <h4 className="font-serif font-semibold text-brand-dark mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-brand-text text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Diferenciais La Dinie</h3>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "🔬", title: "Tecnologia Avançada", desc: "Equipamentos de última geração para resultados superiores" },
              { icon: "👨‍⚕️", title: "Profissionais Especializados", desc: "Equipe capacitada e em constante atualização" },
              { icon: "📋", title: "Protocolos Personalizados", desc: "Tratamentos adaptados às suas necessidades específicas" },
            ].map(item => (
              <div key={item.title} className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
                <div className="text-brand-gold text-3xl md:text-5xl mb-3 md:mb-4">{item.icon}</div>
                <h4 className="font-serif font-semibold text-brand-dark mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-brand-text text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-6 sm:p-10 md:p-12 rounded-lg">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Pronta para cuidar de você?</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende uma avaliação e conheça os tratamentos ideais para você!</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar uma avaliação de estética."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-brand-light transition-colors text-sm md:text-lg"
          >
            Agendar Avaliação
          </a>
        </section>
      </div>
    </div>
  );
};

export default EsteticaPage;
