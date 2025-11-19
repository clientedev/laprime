import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4 text-center">
    {children}
  </h2>
);

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Bem-vinda à La Prime Saúde e Bem Estar</SectionTitle>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
          A clínica foi construída com o intuito de que o cliente não venha só procurar um serviço, 
          mas que ele se sinta acolhido e com a sua autoestima elevada.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-brand-dark">Nossa História</h3>
            <p className="text-gray-600 leading-relaxed">
              A La Prime nasceu do desejo de criar um espaço onde beleza, saúde e bem-estar se encontram. 
              Mais do que uma clínica, somos um universo dedicado ao cuidado completo: salão, unhas, cílios, 
              estética e odontologia em um só lugar. Acreditamos que cuidar de si é um ato de amor próprio, 
              e nossa missão é proporcionar esse momento especial com atendimento acolhedor e qualidade excepcional.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-brand-dark">Missão</h4>
                <p className="text-gray-500">Elevar a autoestima e proporcionar bem-estar através de serviços de beleza e saúde com atendimento acolhedor e personalizado.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-dark">Visão</h4>
                <p className="text-gray-500">Ser referência em cuidado integral de beleza e saúde, reconhecida pelo ambiente acolhedor e resultados que transformam vidas.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-dark">Valores</h4>
                <p className="text-gray-500">Acolhimento, qualidade, autoestima, bem-estar e atendimento humanizado.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop" alt="Ambiente sofisticado da clínica La Prime" className="rounded-lg shadow-lg object-cover w-full h-full"/>
            <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=400&auto=format&fit=crop" alt="Produtos de bem-estar e decoração da clínica" className="rounded-lg shadow-lg object-cover w-full h-full"/>
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop" alt="Sala de tratamento limpa e aconchegante" className="rounded-lg shadow-lg object-cover w-full h-full col-span-2"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
