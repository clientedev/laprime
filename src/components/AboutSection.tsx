import React from 'react';
import aboutFacial from '@assets/about-facial.jpg';
import aboutInterior from '@assets/about-interior.jpg';
import aboutEyebrows from '@assets/about-eyebrows.jpg';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-[#0d2438] mb-6 tracking-tight">
    {children}
  </h2>
);

const DetailItem: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="group">
    <h4 className="font-bold text-[#0d2438] text-base md:text-lg mb-1 group-hover:text-[#bda07e] transition-colors duration-300">
      {title}
    </h4>
    <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
      {content}
    </p>
  </div>
);

const AboutSection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-[#fdfaf7] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-20">
          <SectionTitle>Bem-vinda à La Dinie Saúde e Bem Estar</SectionTitle>
          <div className="h-1 w-24 bg-[#bda07e] mx-auto mb-6 md:mb-8"></div>
          <p className="text-base sm:text-xl md:text-2xl text-gray-700 font-light italic leading-relaxed">
            "A clínica foi construída com o intuito de que o cliente não venha só procurar um serviço,
            mas que ele se sinta acolhido e com a sua autoestima elevada."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-8 md:space-y-10">
            <div className="relative">
              <h3 className="text-xl md:text-3xl font-serif text-[#0d2438] mb-4 md:mb-6">Nossa História</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-lg font-light first-letter:text-3xl md:first-letter:text-4xl first-letter:font-serif first-letter:text-[#bda07e] first-letter:mr-1">
                A La Dinie nasceu do desejo de criar um espaço onde beleza, saúde e bem-estar se encontram.
                Mais do que uma clínica, somos um universo dedicado ao cuidado completo: salão, unhas, cílios,
                estética e odontologia em um só lugar. Acreditamos que cuidar de si é um ato de amor próprio,
                e nossa missão é proporcionar esse momento especial com atendimento acolhedor e qualidade excepcional.
              </p>
            </div>

            <div className="grid gap-6 pt-4 md:pt-6 border-t border-[#bda07e]/20">
              <DetailItem title="Missão" content="Elevar a autoestima e proporcionar bem-estar através de serviços de beleza e saúde com atendimento acolhedor e personalizado." />
              <DetailItem title="Visão" content="Ser referência em cuidado integral de beleza e saúde, reconhecida pelo ambiente acolhedor e resultados que transformam vidas." />
              <DetailItem title="Valores" content="Acolhimento, qualidade, autoestima, bem-estar e atendimento humanizado." />
            </div>
          </div>

          {/* Image Grid - hidden on small screens, shown on lg+ */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[600px]">
              <div className="col-span-8 row-span-12 relative overflow-hidden rounded-2xl shadow-2xl group">
                <img src={aboutInterior} alt="Interior sofisticado La Dinie" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2438]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="col-span-4 row-span-6 relative overflow-hidden rounded-2xl shadow-xl group">
                <img src={aboutFacial} alt="Tratamento facial premium" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="col-span-4 row-span-6 relative overflow-hidden rounded-2xl shadow-xl group">
                <img src={aboutEyebrows} alt="Design de sobrancelhas" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#bda07e]/10 -z-10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-[#bda07e]/20 -z-10 rounded-full"></div>
          </div>

          {/* Mobile image row - shown only on small/medium screens */}
          <div className="grid grid-cols-3 gap-3 lg:hidden">
            <div className="col-span-2 overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
              <img src={aboutInterior} alt="Interior La Dinie" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-xl shadow-md flex-1">
                <img src={aboutFacial} alt="Tratamento facial" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-xl shadow-md flex-1">
                <img src={aboutEyebrows} alt="Design sobrancelhas" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
