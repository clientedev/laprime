
import React from 'react';
import { Link } from 'react-router-dom';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-3 md:mb-4 text-center">
        {children}
    </h2>
);

const ServiceCard: React.FC<{ icon: React.ReactElement, title: string, description: string, link?: string }> = ({ icon, title, description, link }) => {
    const content = (
        <>
            <div className="bg-brand-gold/10 text-brand-gold rounded-full p-3 md:p-4 mb-4 md:mb-6">
                {icon}
            </div>
            <h3 className="text-base md:text-xl font-serif text-brand-dark mb-2">{title}</h3>
            <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">{description}</p>
            {link && (
                <span className="text-brand-gold font-semibold text-xs md:text-sm inline-flex items-center">
                    Saiba mais
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            )}
        </>
    );

    if (link) {
        return (
            <Link to={link} className="bg-white p-5 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center hover:transform hover:-translate-y-1">
                {content}
            </Link>
        );
    }

    return (
        <div className="bg-white p-5 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center">
            {content}
        </div>
    );
};

const EsteticaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2a2 2 0 0 1 2 2v.5a2 2 0 0 0 2 2h.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h.5a2 2 0 0 0 2-2v-.5a2 2 0 0 1 2-2z"></path><line x1="12" y1="12" x2="12" y2="12"></line><line x1="8" y1="12" x2="8" y2="12"></line><line x1="16" y1="12" x2="16" y2="12"></line><path d="M9 17c1.5-1.5 3-1.5 4.5 0"></path></svg>;
const OdontoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.16,13.16a2.1,2.1,0,0,0-2.1.53,5.34,5.34,0,0,1-7,0,2.1,2.1,0,0,0-2.1-.53,2.1,2.1,0,0,0-.53,2.1,8,8,0,0,0,12.26,0,2.1,2.1,0,0,0-.53-2.1Z"></path><path d="M7,12.28a5.5,5.5,0,0,0,10,0"></path><path d="M12,2a10,10,0,1,0,0,20,10,10,0,0,0,0-20Z"></path></svg>;
const ManicureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.88 9.035L12.22 2.375a.333.333 0 0 0-.472 0l-6.66 6.66a.333.333 0 0 0 0 .472l6.66 6.66a.333.333 0 0 0 .472 0l6.66-6.66a.333.333 0 0 0 0-.472z"></path><path d="M18 13.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-6.5"></path></svg>;
const SpaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c.5-2 1-3.5 2-5 1.4-2 3-3 5-4-1.5 5-4 8-7 9z"/><path d="M12 22c-.5-2-1-3.5-2-5-1.4-2-3-3-5-4 1.5 5 4 8 7 9z"/><path d="M12 22V12"/><path d="M12 12c1-2 2-3 4-4-1 4-3 5-4 4z"/><path d="M12 12c-1-2-2-3-4-4 1 4 3 5 4 4z"/></svg>;
const ReconstrucaoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"/><path d="M12 22v-6"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="M2 12h6"/><path d="M22 12h-6"/><path d="m4.93 19.07 4.24-4.24"/><path d="m14.83 9.17 4.24-4.24"/></svg>;
const BrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8c4-4 16-4 20 0"/><path d="M5 11c1-.5 2-1 3.5-1"/><path d="M19 11c-1-.5-2-1-3.5-1"/><path d="M11 11c.5-.3 1-.5 1-.5s.5.2 1 .5"/></svg>;
const LashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const HennaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11z"/></svg>;

const ServicesSection: React.FC = () => {
    const services = [
        { icon: <EsteticaIcon />, title: "Estética Facial e Corporal", description: "Tecnologias laser, criolipólise, protocolos personalizados e tratamentos para celulite e flacidez.", link: "/servicos/estetica" },
        { icon: <OdontoIcon />, title: "Odontologia Estética", description: "Conquiste o sorriso dos seus sonhos com clareamento, lentes de contato e harmonização.", link: "/servicos/odontologia" },
        { icon: <SpaIcon />, title: "Spa", description: "Rituais de relaxamento, massagens terapêuticas e experiências exclusivas de bem-estar.", link: "/servicos/spa" },
        { icon: <ManicureIcon />, title: "Manicure e Pedicure", description: "Mãos e pés impecáveis com serviços de alta qualidade em um ambiente relaxante e seguro.", link: "/servicos/unhas" },
        { icon: <ReconstrucaoIcon />, title: "Reconstrução Capilar", description: "Tratamento profundo que devolve massa, brilho e força aos cabelos danificados.", link: "/servicos/reconstrucao" },
        { icon: <HennaIcon />, title: "Design Henna e Tintura", description: "Sobrancelhas perfeitas com design profissional, henna ou tintura para um olhar marcante.", link: "/servicos/design-henna" },
        { icon: <BrowIcon />, title: "Brow Lamination", description: "Sobrancelhas alinhadas, volumosas e cheias com efeito que dura semanas.", link: "/servicos/brow-lamination" },
        { icon: <LashIcon />, title: "Lash Lifting", description: "Curvatura natural dos cílios com efeito imediato e duração de até 8 semanas.", link: "/servicos/lifting" },
    ];

    return (
        <section className="py-12 md:py-20 bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>Nossos Serviços</SectionTitle>
                <p className="text-center max-w-3xl mx-auto mb-8 md:mb-12 text-gray-600 text-sm md:text-base">
                    Oferecemos uma gama completa de serviços para o seu bem-estar, unindo saúde e beleza em um só lugar.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {(Array.isArray(services) ? services : []).map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                    <div className="bg-brand-dark text-white p-5 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center justify-center">
                        <h3 className="text-base md:text-xl font-serif text-brand-gold mb-2">E muito mais!</h3>
                        <p className="text-gray-300 text-xs md:text-sm">Agende uma avaliação e descubra o tratamento perfeito para você.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
