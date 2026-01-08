import React from 'react';
import { Link } from 'react-router-dom';

const CiliosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="relative h-96 bg-gradient-to-r from-brand-dark via-brand-gold to-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Extensão de Cílios</h1>
          <p className="text-xl md:text-2xl font-light">Valorize seu olhar com técnicas profissionais</p>
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
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Transforme seu Olhar</h2>
          <p className="text-lg text-brand-text leading-relaxed mb-8">
            A extensão de cílios é um procedimento artesanal que valoriza naturalmente seu olhar, 
            proporcionando volume, comprimento e curvatura aos seus cílios. Acorde todos os dias 
            com cílios perfeitos, sem precisar de máscara ou maquiagem!
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Técnicas Disponíveis</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-gold">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Fio a Fio Clássico</h4>
              <p className="text-brand-text mb-4">
                A técnica mais natural e delicada. Aplicamos um fio sintético em cada cílio natural, 
                proporcionando densidade e comprimento sem pesar. Perfeito para quem busca um visual 
                discreto e elegante no dia a dia.
              </p>
              <div className="border-t border-brand-light pt-4 mt-4">
                <h5 className="font-semibold text-brand-dark mb-2">Benefícios:</h5>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Aparência natural e delicada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Ideal para uso diário</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Durabilidade de 3 a 4 semanas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Não danifica os cílios naturais</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-dark">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Volume Russo</h4>
              <p className="text-brand-text mb-4">
                Técnica que aplica de 2 a 5 fios ultrafinos em cada cílio natural, criando um efeito 
                de volume intenso mas ainda natural. Seu olhar ganha dramaticidade sem parecer artificial.
              </p>
              <div className="border-t border-brand-light pt-4 mt-4">
                <h5 className="font-semibold text-brand-dark mb-2">Benefícios:</h5>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Volume expressivo e marcante</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Efeito "olhar de boneca" natural</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Perfeito para eventos e ocasiões especiais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Fios mais leves que o clássico</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-gold">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Mega Volume</h4>
              <p className="text-brand-text mb-4">
                Para quem deseja o máximo de impacto! Aplicamos 6 ou mais fios ultrafinos por cílio natural, 
                criando um olhar extremamente volumoso e glamouroso. Transformação total garantida!
              </p>
              <div className="border-t border-brand-light pt-4 mt-4">
                <h5 className="font-semibold text-brand-dark mb-2">Benefícios:</h5>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Máximo volume e densidade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Olhar extremamente marcante</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Dispensa totalmente o uso de máscara</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Ideal para quem ama maquiagem marcada</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-brand-dark">
              <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">Lash Lifting</h4>
              <p className="text-brand-text mb-4">
                Tratamento que curva e realça seus cílios naturais sem adicionar fios. Perfeito para quem 
                tem cílios longos mas retos, ou deseja um visual mais natural sem manutenção constante.
              </p>
              <div className="border-t border-brand-light pt-4 mt-4">
                <h5 className="font-semibold text-brand-dark mb-2">Benefícios:</h5>
                <ul className="space-y-2 text-brand-text">
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Curvatura natural e duradoura</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Sem necessidade de manutenção</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Pode combinar com tintura de cílios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-gold mr-2">✓</span>
                    <span>Duração de 6 a 8 semanas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-brand-dark/5 to-brand-gold/5 p-8 rounded-lg">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Processo de Aplicação</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-brand-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Consulta</h4>
              <p className="text-brand-text text-sm">Analisamos seus cílios e definimos a melhor técnica para você</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Preparação</h4>
              <p className="text-brand-text text-sm">Limpeza e proteção da área dos olhos para segurança total</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Aplicação</h4>
              <p className="text-brand-text text-sm">Técnica artesanal fio a fio com cola hipoalergênica</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-serif font-semibold text-brand-dark mb-2">Finalização</h4>
              <p className="text-brand-text text-sm">Orientações de cuidados para máxima durabilidade</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Cuidados Pós-Aplicação</h3>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-brand-gold mr-3 text-xl">✓</span>
                <span className="text-brand-text">Evite molhar os cílios nas primeiras 24 horas</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-gold mr-3 text-xl">✓</span>
                <span className="text-brand-text">Não use produtos oleosos na região dos olhos</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-gold mr-3 text-xl">✓</span>
                <span className="text-brand-text">Escove os cílios diariamente com a escovinha</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-gold mr-3 text-xl">✓</span>
                <span className="text-brand-text">Evite dormir de bruços para não amassar</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-gold mr-3 text-xl">✓</span>
                <span className="text-brand-text">Faça manutenção a cada 2-3 semanas</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-gold mr-3 text-xl">✓</span>
                <span className="text-brand-text">Não puxe ou coce os cílios</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-brand-dark to-brand-gold text-white p-12 rounded-lg">
          <h3 className="text-3xl font-serif font-bold mb-4">Pronta para um olhar deslumbrante?</h3>
          <p className="text-xl mb-8">Agende sua avaliação gratuita e descubra a técnica ideal para você!</p>
          <a 
            href="https://wa.me/5511992153511?text=Olá! Gostaria de agendar uma extensão de cílios." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-brand-light transition-colors text-lg"
          >
            Agendar Avaliação Gratuita
          </a>
        </section>
      </div>
    </div>
  );
};

export default CiliosPage;
