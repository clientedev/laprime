import React from 'react';
import aboutFacial from '@assets/about-facial.jpg';
import aboutInterior from '@assets/about-interior.jpg';
import aboutEyebrows from '@assets/about-eyebrows.jpg';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-serif text-[#0d2438] mb-6 tracking-tight">
    {children}
  </h2>
);

const DetailItem: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="group">
    <h4 className="font-bold text-[#0d2438] text-lg mb-1 group-hover:text-[#bda07e] transition-colors duration-300">
      {title}
    </h4>
    <p className="text-gray-600 leading-relaxed font-light">
      {content}
    </p>
  </div>
);

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#fdfaf7] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-down">
          <SectionTitle>Bem-vinda à La Prime Saúde e Bem Estar</SectionTitle>
          <div className="h-1 w-24 bg-[#bda07e] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 font-light italic leading-relaxed">
            "A clínica foi construída com o intuito de que o cliente não venha só procurar um serviço,
            mas que ele se sinta acolhido e com a sua autoestima elevada."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-10 animate-fade-in-up">
            <div className="relative">
              <span className="absolute -left-8 top-0 text-7xl font-serif text-[#bda07e]/10 -z-10">L P</span>
              <h3 className="text-3xl font-serif text-[#0d2438] mb-6 relative">Nossa História</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-light first-letter:text-4xl first-letter:font-serif first-letter:text-[#bda07e] first-letter:mr-1">
                A La Prime nasceu do desejo de criar um espaço onde beleza, saúde e bem-estar se encontram.
                Mais do que uma clínica, somos um universo dedicado ao cuidado completo: salão, unhas, cílios,
                estética e odontologia em um só lugar. Acreditamos que cuidar de si é um ato de amor próprio,
                e nossa missão é proporcionar esse momento especial com atendimento acolhedor e qualidade excepcional.
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-8 pt-6 border-t border-[#bda07e]/20">
              <DetailItem
                title="Missão"
                content="Elevar a autoestima e proporcionar bem-estar através de serviços de beleza e saúde com atendimento acolhedor e personalizado."
              />
              <DetailItem
                title="Visão"
                content="Ser referência em cuidado integral de beleza e saúde, reconhecida pelo ambiente acolhedor e resultados que transformam vidas."
              />
              <DetailItem
                title="Valores"
                content="Acolhimento, qualidade, autoestima, bem-estar e atendimento humanizado."
              />
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[600px]">
              {/* Main Large Image (Interior) */}
              <div className="col-span-8 row-span-12 relative overflow-hidden rounded-2xl shadow-2xl group">
                <img
                  src={aboutInterior}
                  alt="Interior sofisticado La Prime"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2438]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Top Small Image (Facial) */}
              <div className="col-span-4 row-span-6 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={aboutFacial}
                  alt="Tratamento facial premium"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Bottom Small Image (Eyebrows) */}
              <div className="col-span-4 row-span-6 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={aboutEyebrows}
                  alt="Design de sobrancelhas"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#bda07e]/10 -z-10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-[#bda07e]/20 -z-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
