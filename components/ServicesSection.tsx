
import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4 text-center">
      {children}
    </h2>
  );
  
// Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ServiceCard: React.FC<{ icon: React.ReactElement, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center">
        <div className="bg-brand-gold/10 text-brand-gold rounded-full p-4 mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-serif text-brand-dark mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const EsteticaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2a2 2 0 0 1 2 2v.5a2 2 0 0 0 2 2h.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h.5a2 2 0 0 0 2-2v-.5a2 2 0 0 1 2-2z"></path><line x1="12" y1="12" x2="12" y2="12"></line><line x1="8" y1="12" x2="8" y2="12"></line><line x1="16" y1="12" x2="16" y2="12"></line><path d="M9 17c1.5-1.5 3-1.5 4.5 0"></path></svg>;
const OdontoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.16,13.16a2.1,2.1,0,0,0-2.1.53,5.34,5.34,0,0,1-7,0,2.1,2.1,0,0,0-2.1-.53,2.1,2.1,0,0,0-.53,2.1,8,8,0,0,0,12.26,0,2.1,2.1,0,0,0-.53-2.1Z"></path><path d="M21.16,13.16a2.1,2.1,0,0,0-2.1.53,5.34,5.34,0,0,1-7,0,2.1,2.1,0,0,0-2.1-.53,2.1,2.1,0,0,0-.53,2.1,8,8,0,0,0,12.26,0,2.1,2.1,0,0,0-.53-2.1Z"></path><path d="M7,12.28a5.5,5.5,0,0,0,10,0"></path><path d="M12,2a10,10,0,1,0,0,20,10,10,0,0,0,0-20Z"></path></svg>;
const ManicureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.88 9.035L12.22 2.375a.333.333 0 0 0-.472 0l-6.66 6.66a.333.333 0 0 0 0 .472l6.66 6.66a.333.333 0 0 0 .472 0l6.66-6.66a.333.333 0 0 0 0-.472z"></path><path d="M18 13.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-6.5"></path></svg>;
const HairIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 2.5a2.5 2.5 0 0 0-5 0V6h5V2.5z"></path><path d="M15.5 6H8.5c-1.105 0-2 .895-2 2V12c0 .53.211 1.039.586 1.414L10 16.5l-2 5.5"></path><path d="M10 12h2"></path><path d="M8.5 2.5a2.5 2.5 0 0 1 5 0V6h-5V2.5z"></path></svg>;
const LashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

const ServicesSection: React.FC = () => {
    const services = [
        { icon: <EsteticaIcon />, title: "Estética Facial e Corporal", description: "Tratamentos para realçar sua beleza natural, com tecnologias de ponta e cuidado personalizado." },
        { icon: <OdontoIcon />, title: "Odontologia Estética", description: "Conquiste o sorriso dos seus sonhos com clareamento, lentes de contato e harmonização." },
        { icon: <ManicureIcon />, title: "Manicure e Pedicure", description: "Mãos e pés impecáveis com serviços de alta qualidade em um ambiente relaxante e seguro." },
        { icon: <HairIcon />, title: "Cabeleireiro", description: "Cortes, coloração e tratamentos que expressam sua identidade e cuidam da saúde dos seus fios." },
        { icon: <LashIcon />, title: "Lash Designer", description: "Realce seu olhar com extensões de cílios aplicadas por especialistas, garantindo um resultado natural." },
    ];

    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>Nossos Serviços</SectionTitle>
                <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
                    Oferecemos uma gama completa de serviços para o seu bem-estar, unindo saúde e beleza em um só lugar.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                     <div className="bg-brand-dark text-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center justify-center">
                        <h3 className="text-xl font-serif text-brand-gold mb-2">E muito mais!</h3>
                        <p className="text-gray-300 text-sm">Agende uma avaliação e descubra o tratamento perfeito para você.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
