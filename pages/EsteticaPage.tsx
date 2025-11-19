import React from 'react';
import { Link } from 'react-router-dom';

const EsteticaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-96 bg-gradient-to-r from-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Estética Facial e Corporal</h1>
          <p className="text-xl md:text-2xl font-light">Tecnologia e cuidado para sua pele</p>
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
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Tratamentos Estéticos Avançados</h2>
          <p className="text-lg text-brand-text leading-relaxed mb-8">
            Na La Prime, combinamos tecnologia de ponta com técnicas especializadas para cuidar da sua pele. 
            Nossos tratamentos faciais e corporais são personalizados para atender suas necessidades específicas, 
            promovendo beleza, saúde e bem-estar.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Tratamentos Faciais</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Limpeza de Pele Profunda</h4>
              <p className="text-brand-text mb-4">
                Procedimento completo para remover impurezas, cravos e células mortas. Sua pele fica renovada, 
                hidratada e com aspecto saudável.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Remoção profunda de impurezas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Extração de cravos e comedões</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Hidratação e revitalização</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Máscara específica para seu tipo de pele</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Peeling Químico</h4>
              <p className="text-brand-text mb-4">
                Renovação celular através de ácidos que removem camadas superficiais da pele. 
                Reduz manchas, melhora textura e promove o rejuvenescimento.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Clareamento de manchas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Renovação da pele</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Melhora da textura</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Estímulo de colágeno</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Microagulhamento</h4>
              <p className="text-brand-text mb-4">
                Técnica que estimula a produção natural de colágeno através de microlesões controladas. 
                Excelente para rejuvenescimento, cicatrizes e estrias.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Rejuvenescimento facial</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Redução de linhas de expressão</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Melhora de cicatrizes de acne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Aumento da firmeza da pele</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Radiofrequência Facial</h4>
              <p className="text-brand-text mb-4">
                Tecnologia que aquece as camadas profundas da pele, estimulando colágeno e elastina. 
                Lifting não invasivo para combater flacidez.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Efeito lifting imediato</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Redução de flacidez</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Contorno facial definido</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Sem tempo de recuperação</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Tratamentos Corporais</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Drenagem Linfática</h4>
              <p className="text-brand-text mb-4">
                Massagem terapêutica que estimula o sistema linfático, reduzindo retenção de líquidos 
                e promovendo desintoxicação. Pernas leves e corpo desinchado.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Redução de inchaço e retenção</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Melhora da circulação</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Desintoxicação do organismo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Alívio de pernas cansadas</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Criolipólise</h4>
              <p className="text-brand-text mb-4">
                Tecnologia que congela e elimina células de gordura localizada de forma não invasiva. 
                Redução de medidas sem cirurgia.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Eliminação de gordura localizada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Procedimento não invasivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Resultados visíveis em semanas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Sem tempo de recuperação</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Radiofrequência Corporal</h4>
              <p className="text-brand-text mb-4">
                Combate à flacidez e celulite através do aquecimento profundo dos tecidos. 
                Corpo mais firme e contornado.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Firmeza da pele</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Redução de celulite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Melhora do contorno corporal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Estímulo de colágeno</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Massagem Modeladora</h4>
              <p className="text-brand-text mb-4">
                Técnica intensa que quebra nódulos de gordura e melhora a circulação. 
                Aliada perfeita na redução de medidas e celulite.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Quebra de gordura localizada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Melhora da celulite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Tonificação muscular</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Resultados progressivos</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-brand-dark/5 to-brand-gold/5 p-8 rounded-lg">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Tratamentos Complementares</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3">Depilação a Laser</h4>
              <p className="text-brand-text text-sm mb-2">Remoção permanente de pelos com tecnologia avançada e segura.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3">Design de Sobrancelhas</h4>
              <p className="text-brand-text text-sm mb-2">Modelagem perfeita para harmonizar seu rosto.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3">Micropigmentação</h4>
              <p className="text-brand-text text-sm mb-2">Sobrancelhas perfeitas 24 horas por dia com técnica fio a fio.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Diferenciais La Prime</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">🔬</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Tecnologia Avançada</h4>
              <p className="text-brand-text">Equipamentos de última geração para resultados superiores</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">👨‍⚕️</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Profissionais Especializados</h4>
              <p className="text-brand-text">Equipe capacitada e em constante atualização</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">📋</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Protocolos Personalizados</h4>
              <p className="text-brand-text">Tratamentos adaptados às suas necessidades específicas</p>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-12 rounded-lg">
          <h3 className="text-3xl font-serif font-bold mb-4">Pronta para cuidar de você?</h3>
          <p className="text-xl mb-8">Agende uma avaliação e conheça os tratamentos ideais para você!</p>
          <a 
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar uma avaliação de estética." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-brand-light transition-colors text-lg"
          >
            Agendar Avaliação
          </a>
        </section>
      </div>
    </div>
  );
};

export default EsteticaPage;
