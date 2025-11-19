import React from 'react';
import { Link } from 'react-router-dom';

const OdontologiaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-96 bg-gradient-to-r from-brand-dark to-brand-gold flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Odontologia Estética</h1>
          <p className="text-xl md:text-2xl font-light">Tecnologia e cuidado para seu sorriso</p>
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
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Odontologia Moderna e Humanizada</h2>
          <p className="text-lg text-brand-text leading-relaxed mb-8">
            Na La Prime, oferecemos uma odontologia completa que une estética, saúde e bem-estar. 
            Com tecnologia de ponta e profissionais altamente capacitados, cuidamos do seu sorriso 
            com excelência e acolhimento.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Tratamentos Estéticos</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-gold">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Clareamento Dental</h4>
              <p className="text-brand-text mb-4">
                Dentes mais brancos e brilhantes em poucas sessões. Utilizamos técnicas seguras e eficazes 
                que removem manchas e descolorações sem sensibilidade excessiva.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Clareamento a laser - resultados rápidos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Clareamento caseiro supervisionado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Procedimento indolor e seguro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Acompanhamento profissional</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-dark">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Lentes de Contato Dental</h4>
              <p className="text-brand-text mb-4">
                Lâminas ultrafinas de porcelana que transformam completamente seu sorriso. 
                Correção de cor, formato e alinhamento com aspecto natural impecável.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Espessura mínima, máxima naturalidade</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Preservação do dente natural</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Durabilidade superior a 20 anos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Tecnologia CAD/CAM para precisão</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-gold">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Facetas de Porcelana</h4>
              <p className="text-brand-text mb-4">
                Restaurações estéticas que cobrem a parte frontal dos dentes, corrigindo imperfeições 
                e proporcionando um sorriso harmonioso e natural.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Correção de manchas permanentes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Alinhamento de dentes desalinhados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Fechamento de espaços (diastemas)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Material resistente a manchas</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-dark">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Harmonização Orofacial</h4>
              <p className="text-brand-text mb-4">
                Integração entre odontologia e estética facial. Aplicação de toxina botulínica e 
                preenchimentos para um equilíbrio perfeito entre sorriso e rosto.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Toxina botulínica (Botox)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Preenchedores faciais</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Sorriso gengival - redução de gengiva</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Equilíbrio entre dentes e face</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Tratamentos Funcionais</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Implantes Dentários</h4>
              <p className="text-brand-text mb-4">
                Reabilitação completa com implantes de titânio de alta qualidade. 
                Recupere a função mastigatória e a estética do seu sorriso com segurança.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Planejamento digital 3D</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Implantes de titânio importados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Próteses de zircônia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Carga imediata quando possível</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Ortodontia (Aparelhos)</h4>
              <p className="text-brand-text mb-4">
                Correção do alinhamento dentário com aparelhos fixos ou alinhadores invisíveis. 
                Sorriso alinhado e mordida funcional.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Aparelhos fixos estéticos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Alinhadores transparentes (tipo Invisalign)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Ortodontia para adultos e crianças</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Acompanhamento personalizado</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Próteses Dentárias</h4>
              <p className="text-brand-text mb-4">
                Substituição de dentes perdidos com próteses modernas e naturais. 
                Recupere sua mastigação e autoestima.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Próteses sobre implantes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Próteses fixas (pontes)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Próteses removíveis modernas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Materiais de última geração</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Tratamento de Canal</h4>
              <p className="text-brand-text mb-4">
                Endodontia moderna e indolor para salvar dentes comprometidos. 
                Técnicas avançadas que preservam seus dentes naturais.
              </p>
              <ul className="space-y-2 text-brand-text">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Procedimento com anestesia eficaz</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Instrumentação rotatória moderna</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Preservação do dente natural</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">✓</span>
                  <span>Alta taxa de sucesso</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-brand-dark/5 to-brand-gold/5 p-8 rounded-lg">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Tecnologia Odontológica</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3">Scanner Intraoral</h4>
              <p className="text-brand-text text-sm">Moldagem digital 3D sem desconforto, com precisão máxima para próteses e alinhadores.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3">Planejamento Digital</h4>
              <p className="text-brand-text text-sm">Simulação do resultado final antes de iniciar o tratamento. Você vê o resultado antes!</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-serif font-semibold text-brand-dark mb-3">Laserterapia</h4>
              <p className="text-brand-text text-sm">Procedimentos menos invasivos, cicatrização mais rápida e menor desconforto pós-operatório.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Por que escolher nossa odontologia?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">🦷</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Odontologia Digital</h4>
              <p className="text-brand-text">Equipamentos de ponta para diagnósticos precisos e tratamentos eficazes</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">👨‍⚕️</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Equipe Especializada</h4>
              <p className="text-brand-text">Profissionais qualificados em constante atualização técnica</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-brand-gold text-5xl mb-4">💖</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Atendimento Humanizado</h4>
              <p className="text-brand-text">Cuidado acolhedor e personalizado para sua tranquilidade</p>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-12 rounded-lg">
          <h3 className="text-3xl font-serif font-bold mb-4">Pronto para transformar seu sorriso?</h3>
          <p className="text-xl mb-8">Agende uma avaliação odontológica completa!</p>
          <a 
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar uma avaliação odontológica." 
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

export default OdontologiaPage;
