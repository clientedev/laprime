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
        <SectionTitle>Bem-vinda à La Prime</SectionTitle>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
          Nascemos do desejo de promover autocuidado, saúde e autoestima. Com apenas 9 meses, já nos tornamos um refúgio para quem busca uma experiência de luxo acessível e resultados que transformam.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-brand-dark">Nossa História</h3>
            <p className="text-gray-600 leading-relaxed">
              Fundada por Sabrina Teles, a La Prime foi criada para ser mais que uma clínica: um universo de beleza onde todos os serviços de bem-estar se encontram. Acreditamos que cuidar de si é um ato de amor e nossa missão é facilitar esse momento, com atendimento personalizado e a mais alta qualidade.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-brand-dark">Missão</h4>
                <p className="text-gray-500">Oferecer uma experiência completa de beleza e bem-estar, melhorando a qualidade de vida e a autoestima de nossos clientes.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-dark">Visão</h4>
                <p className="text-gray-500">Ser a clínica de referência em estética e bem-estar, reconhecida pela excelência, inovação e acolhimento.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-dark">Valores</h4>
                <p className="text-gray-500">Atendimento personalizado, qualidade, inovação, e um ambiente acolhedor e moderno.</p>
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
