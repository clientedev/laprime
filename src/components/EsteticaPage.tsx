import React from 'react';
import { Link } from 'react-router-dom';

const EsteticaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Estética Facial e Corporal</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Tecnologia, ciência e cuidado para sua pele</p>
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

        {/* DESTAQUE: Tecnologias de Ponta */}
        <section className="mb-10 md:mb-16 bg-gradient-to-br from-brand-dark to-brand-gold p-6 md:p-12 rounded-2xl shadow-2xl text-white">
          <div className="text-center mb-6 md:mb-10">
            <span className="inline-block bg-white/20 text-white text-xs md:text-sm uppercase tracking-widest px-4 py-1 rounded-full mb-3 md:mb-4">Em Destaque</span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 md:mb-4">Tecnologias de Ponta</h3>
            <p className="text-sm md:text-lg max-w-3xl mx-auto opacity-90">
              Equipamentos de última geração que entregam resultados visíveis com segurança e conforto.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: "❄️", title: "Criolipólise", desc: "Tecnologia que congela e elimina células de gordura localizada de forma não invasiva. Resultados visíveis sem cirurgia ou tempo de recuperação.", items: ["Eliminação de gordura localizada", "Procedimento não invasivo", "Resultados em poucas semanas", "Sem cortes ou anestesia"] },
              { icon: "💎", title: "Depilação a Laser", desc: "Remoção definitiva dos pelos com tecnologia avançada e segura para todos os tipos de pele. Conforto e eficácia em poucas sessões.", items: ["Remoção definitiva dos pelos", "Indicado para todos os tons de pele", "Sem dor com sistema de resfriamento", "Resultados progressivos"] },
              { icon: "⚡", title: "Radiofrequência", desc: "Aquecimento profundo dos tecidos que estimula colágeno e elastina. Combate flacidez facial e corporal de forma indolor.", items: ["Lifting não invasivo", "Firmeza imediata e progressiva", "Estímulo de colágeno e elastina", "Sem tempo de recuperação"] },
              { icon: "💡", title: "Laser de Rejuvenescimento", desc: "Tecnologia laser que renova a pele em profundidade, tratando manchas, vermelhidão e sinais do envelhecimento.", items: ["Clareamento de manchas", "Uniformização da pele", "Estímulo de colágeno", "Pele renovada e jovem"] },
            ].map(card => (
              <div key={card.title} className="bg-white/10 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-white/20">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">{card.icon}</div>
                <h4 className="text-lg md:text-2xl font-serif font-bold mb-2 md:mb-3">{card.title}</h4>
                <p className="text-sm md:text-base mb-3 md:mb-4 opacity-90">{card.desc}</p>
                <ul className="space-y-1 md:space-y-2">
                  {card.items.map(item => (
                    <li key={item} className="flex items-start text-xs md:text-sm">
                      <span className="text-white mr-2 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Protocolos Personalizados */}
        <section className="mb-10 md:mb-16">
          <div className="bg-white border-l-4 border-brand-gold p-5 md:p-8 rounded-lg shadow-md mb-6">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-2 md:mb-3">Protocolos Personalizados</h3>
            <p className="text-sm md:text-base text-brand-text">
              Cada pele e cada corpo são únicos. Nossos protocolos são desenhados sob medida combinando técnicas e ativos
              específicos para os seus objetivos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Enzimas Personalizadas", desc: "Combinação exclusiva de enzimas, fitoativos e termoterapia para acelerar a quebra de gordura e drenagem. Protocolo desenhado a partir da sua avaliação corporal.", items: ["Aceleração do metabolismo local", "Redução de medidas progressiva", "Combate à retenção de líquidos", "Combinação com massagem manual"] },
              { title: "Protocolo Detox Facial", desc: "Sequência de ativos e técnicas para purificar a pele em profundidade, equilibrar a oleosidade e iluminar o rosto.", items: ["Purificação profunda", "Equilíbrio da oleosidade", "Iluminação imediata", "Ativos antioxidantes"] },
              { title: "Peeling Químico Personalizado", desc: "Combinação de ácidos selecionados conforme o tipo de pele e o objetivo: clarear manchas, suavizar acne ou rejuvenescer.", items: ["Renovação celular controlada", "Clareamento de manchas", "Estímulo de colágeno", "Resultados progressivos"] },
              { title: "Microagulhamento + Drug Delivery", desc: "Microlesões controladas combinadas com a aplicação direta de ativos potentes, potencializando o efeito do tratamento.", items: ["Estímulo natural de colágeno", "Penetração potencializada de ativos", "Tratamento de cicatrizes", "Rejuvenescimento profundo"] },
            ].map(card => (
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

        {/* Celulite e Flacidez */}
        <section className="mb-10 md:mb-16 bg-gradient-to-r from-brand-light to-brand-gold/10 p-5 md:p-10 rounded-2xl">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-2 md:mb-3">Celulite e Flacidez</h3>
            <p className="text-sm md:text-base text-brand-text max-w-2xl mx-auto">
              Programas combinados que atuam de dentro para fora, devolvendo firmeza, contorno e textura uniforme à pele.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Tratamento Anticelulite", desc: "Combinação de drenagem, radiofrequência e ativos lipolíticos para combater a celulite em todos os graus.", items: ["Quebra de nódulos", "Melhora da circulação", "Pele mais lisa e uniforme"] },
              { title: "Firmeza Corporal", desc: "Protocolo intensivo que combate a flacidez de braços, abdômen, glúteos e coxas com tecnologia e massagem.", items: ["Estímulo de colágeno", "Tonificação muscular", "Contorno corporal definido"] },
              { title: "Lifting Facial Não Invasivo", desc: "Conjunto de técnicas que combatem a flacidez facial e o envelhecimento sem necessidade de cirurgia.", items: ["Efeito lifting imediato", "Pele mais firme", "Sem tempo de recuperação"] },
            ].map(card => (
              <div key={card.title} className="bg-white p-5 md:p-6 rounded-lg shadow-md">
                <h4 className="text-base md:text-xl font-serif font-semibold text-brand-dark mb-2 md:mb-3">{card.title}</h4>
                <p className="text-sm md:text-base text-brand-text mb-3 md:mb-4">{card.desc}</p>
                <ul className="space-y-1 text-brand-text">
                  {card.items.map(item => (
                    <li key={item} className="flex items-start text-sm">
                      <span className="text-brand-gold mr-2 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Massagens Agrupadas */}
        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-2 md:mb-3">Massagens Terapêuticas</h3>
          <p className="text-sm md:text-base text-brand-text mb-6 md:mb-8 max-w-3xl">
            Nossa carta completa de massagens reúne técnicas para diferentes objetivos: relaxar, modelar, drenar e aliviar tensões.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Drenagem Linfática", desc: "Massagem suave que estimula o sistema linfático, reduzindo inchaço, retenção de líquidos e promovendo desintoxicação." },
              { title: "Massagem Modeladora", desc: "Técnica intensa que quebra nódulos de gordura e melhora o contorno corporal. Aliada na redução de medidas e celulite." },
              { title: "Massagem Relaxante", desc: "Manobras lentas e profundas com óleos essenciais que aliviam o estresse e promovem bem-estar geral." },
              { title: "Massagem com Pedras Quentes", desc: "Combinação de calor e pressão para alívio profundo de tensões musculares e equilíbrio energético." },
              { title: "Massagem Desportiva", desc: "Voltada para quem pratica atividade física, alivia dores musculares e auxilia na recuperação." },
              { title: "Massagem Pós-Operatória", desc: "Drenagem específica que acelera a recuperação após procedimentos cirúrgicos e estéticos." },
            ].map(card => (
              <div key={card.title} className="bg-white p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h4 className="text-base md:text-lg font-serif font-semibold text-brand-dark mb-2">{card.title}</h4>
                <p className="text-sm md:text-base text-brand-text">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tratamentos Faciais */}
        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Tratamentos Faciais</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Limpeza de Pele Profunda", desc: "Procedimento completo para remover impurezas, cravos e células mortas. Sua pele fica renovada, hidratada e com aspecto saudável.", items: ["Remoção profunda de impurezas", "Extração de cravos e comedões", "Hidratação e revitalização", "Máscara específica para seu tipo de pele"] },
              { title: "Hidratação Facial Premium", desc: "Sessão intensiva de hidratação com ativos selecionados que devolvem viço, elasticidade e luminosidade à pele.", items: ["Ativos hidratantes premium", "Pele radiante e luminosa", "Indicado para todas as idades", "Resultado imediato"] },
            ].map(card => (
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
