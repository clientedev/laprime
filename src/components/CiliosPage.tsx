import React from 'react';
import { Link } from 'react-router-dom';

const CiliosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-72 sm:h-96 bg-gradient-to-r from-brand-dark via-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold mb-3">Extensão de Cílios</h1>
          <p className="text-sm sm:text-xl md:text-2xl font-light">Valorize seu olhar com técnicas profissionais</p>
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
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Transforme seu Olhar</h2>
          <p className="text-base md:text-lg text-brand-text leading-relaxed">
            A extensão de cílios é um procedimento artesanal que valoriza naturalmente seu olhar, proporcionando volume, 
            comprimento e curvatura aos seus cílios. Acorde todos os dias com cílios perfeitos, sem precisar de máscara ou maquiagem!
          </p>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-6 md:mb-8">Técnicas Disponíveis</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { title: "Fio a Fio Clássico", border: "border-brand-gold", desc: "A técnica mais natural e delicada. Aplicamos um fio sintético em cada cílio natural, proporcionando densidade e comprimento sem pesar.", items: ["Aparência natural e delicada", "Ideal para uso diário", "Durabilidade de 3 a 4 semanas", "Não danifica os cílios naturais"] },
              { title: "Volume Russo", border: "border-brand-dark", desc: "Técnica que aplica de 2 a 5 fios ultrafinos em cada cílio natural, criando um efeito de volume intenso mas ainda natural.", items: ["Volume expressivo e marcante", "Efeito \"olhar de boneca\" natural", "Perfeito para eventos e ocasiões especiais", "Fios mais leves que o clássico"] },
              { title: "Mega Volume", border: "border-brand-gold", desc: "Para quem deseja o máximo de impacto! Aplicamos 6 ou mais fios ultrafinos por cílio natural, criando um olhar extremamente volumoso e glamouroso.", items: ["Máximo volume e densidade", "Olhar extremamente marcante", "Dispensa totalmente o uso de máscara", "Ideal para quem ama maquiagem marcada"] },
              { title: "Lash Lifting", border: "border-brand-dark", desc: "Tratamento que curva e realça seus cílios naturais sem adicionar fios. Perfeito para quem tem cílios longos mas retos, ou deseja um visual mais natural.", items: ["Curvatura natural e duradoura", "Sem necessidade de manutenção", "Pode combinar com tintura de cílios", "Duração de 6 a 8 semanas"] },
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
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Processo de Aplicação</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: "1", title: "Consulta", desc: "Analisamos seus cílios e definimos a melhor técnica para você" },
              { step: "2", title: "Preparação", desc: "Limpeza e proteção da área dos olhos para segurança total" },
              { step: "3", title: "Aplicação", desc: "Técnica artesanal fio a fio com cola hipoalergênica" },
              { step: "4", title: "Finalização", desc: "Orientações de cuidados para máxima durabilidade" },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="bg-brand-gold text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-2xl font-bold mx-auto mb-3 md:mb-4">{item.step}</div>
                <h4 className="font-serif font-semibold text-brand-dark mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                <p className="text-brand-text text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-16">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 md:mb-6">Cuidados Pós-Aplicação</h3>
          <div className="bg-white p-5 md:p-8 rounded-lg shadow-md">
            <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {[
                "Evite molhar os cílios nas primeiras 24 horas",
                "Não use produtos oleosos na região dos olhos",
                "Escove os cílios diariamente com a escovinha",
                "Evite dormir de bruços para não amassar",
                "Faça manutenção a cada 2-3 semanas",
                "Não puxe ou coce os cílios",
              ].map(item => (
                <li key={item} className="flex items-start">
                  <span className="text-brand-gold mr-3 text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-brand-text text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-6 sm:p-10 md:p-12 rounded-lg">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Pronta para um olhar deslumbrante?</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8">Agende sua avaliação gratuita e descubra a técnica ideal para você!</p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar uma extensão de cílios."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-brand-light transition-colors text-sm md:text-lg"
          >
            Agendar Avaliação Gratuita
          </a>
        </section>
      </div>
    </div>
  );
};

export default CiliosPage;
