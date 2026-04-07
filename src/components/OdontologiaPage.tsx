import React from 'react';
import { Link } from 'react-router-dom';

const OdontologiaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-dark to-brand-gold flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Odontologia Estética</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Tecnologia e cuidado para seu sorriso</p>
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
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Odontologia Moderna e Humanizada</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed">
            Na La Prime, oferecemos uma odontologia completa que une estética, saúde e bem-estar. 
            Com tecnologia de ponta e profissionais altamente capacitados, cuidamos do seu sorriso com excelência e acolhimento.
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Tratamentos Estéticos</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Clareamento Dental", border: "border-brand-gold", items: ["Clareamento a laser - resultados rápidos", "Clareamento caseiro supervisionado", "Procedimento indolor e seguro", "Acompanhamento profissional"], desc: "Dentes mais brancos e brilhantes em poucas sessões. Utilizamos técnicas seguras e eficazes que removem manchas e descolorações sem sensibilidade excessiva." },
              { title: "Lentes de Contato Dental", border: "border-brand-dark", items: ["Espessura mínima, máxima naturalidade", "Preservação do dente natural", "Durabilidade superior a 20 anos", "Tecnologia CAD/CAM para precisão"], desc: "Lâminas ultrafinas de porcelana que transformam completamente seu sorriso. Correção de cor, formato e alinhamento com aspecto natural impecável." },
              { title: "Facetas de Porcelana", border: "border-brand-gold", items: ["Correção de manchas permanentes", "Alinhamento de dentes desalinhados", "Fechamento de espaços (diastemas)", "Material resistente a manchas"], desc: "Restaurações estéticas que cobrem a parte frontal dos dentes, corrigindo imperfeições e proporcionando um sorriso harmonioso e natural." },
              { title: "Harmonização Orofacial", border: "border-brand-dark", items: ["Toxina botulínica (Botox)", "Preenchedores faciais", "Sorriso gengival - redução de gengiva", "Equilíbrio entre dentes e face"], desc: "Integração entre odontologia e estética facial. Aplicação de toxina botulínica e preenchimentos para um equilíbrio perfeito entre sorriso e rosto." },
            ].map((card) => (
              <div key={card.title} className={`bg-white p-5 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 ${card.border}`}>
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
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Tratamentos Funcionais</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Implantes Dentários", items: ["Planejamento digital 3D", "Implantes de titânio importados", "Próteses de zircônia", "Carga imediata quando possível"], desc: "Reabilitação completa com implantes de titânio de alta qualidade. Recupere a função mastigatória e a estética do seu sorriso com segurança." },
              { title: "Ortodontia (Aparelhos)", items: ["Aparelhos fixos estéticos", "Alinhadores transparentes (tipo Invisalign)", "Ortodontia para adultos e crianças", "Acompanhamento personalizado"], desc: "Correção do alinhamento dentário com aparelhos fixos ou alinhadores invisíveis. Sorriso alinhado e mordida funcional." },
              { title: "Próteses Dentárias", items: ["Próteses sobre implantes", "Próteses fixas (pontes)", "Próteses removíveis modernas", "Materiais de última geração"], desc: "Substituição de dentes perdidos com próteses modernas e naturais. Recupere sua mastigação e autoestima." },
              { title: "Tratamento de Canal", items: ["Procedimento com anestesia eficaz", "Instrumentação rotatória moderna", "Preservação do dente natural", "Alta taxa de sucesso"], desc: "Endodontia moderna e indolor para salvar dentes comprometidos. Técnicas avançadas que preservam seus dentes naturais." },
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
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Tecnologia Odontológica</h3>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Scanner Intraoral", desc: "Moldagem digital 3D sem desconforto, com precisão máxima para próteses e alinhadores." },
              { title: "Planejamento Digital", desc: "Simulação do resultado final antes de iniciar o tratamento. Você vê o resultado antes!" },
              { title: "Laserterapia", desc: "Procedimentos menos invasivos, cicatrização mais rápida e menor desconforto pós-operatório." },
            ].map(item => (
              <div key={item.title} className="bg-white p-4 md:p-6 rounded-lg">
                <h4 className="font-serif font-semibold text-brand-dark mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-brand-text text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Por que escolher nossa odontologia?</h3>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: "🦷", title: "Odontologia Digital", desc: "Equipamentos de ponta para diagnósticos precisos e tratamentos eficazes" },
              { icon: "👨‍⚕️", title: "Equipe Especializada", desc: "Profissionais qualificados em constante atualização técnica" },
              { icon: "💖", title: "Atendimento Humanizado", desc: "Cuidado acolhedor e personalizado para sua tranquilidade" },
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Pronto para transformar seu sorriso?</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende uma avaliação odontológica completa!</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar uma avaliação odontológica."
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

export default OdontologiaPage;
