import React from 'react';
import team1 from '@assets/team-1.jpg';
import team2 from '@assets/team-2.jpg';
import team3 from '@assets/team-3.jpg';

// Team Section - Versão Definitiva com Fotos Corretas
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4 text-center">
    {children}
  </h2>
);

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, description, imageUrl }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center h-full flex flex-col items-center">
    <div className="w-40 h-40 mb-6 rounded-full overflow-hidden bg-brand-gold/10 border-4 border-brand-gold/20 shadow-inner">
      <img
        src={imageUrl}
        alt={`${name} - ${role}`}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
      />
    </div>
    <h3 className="text-2xl font-serif text-brand-dark mb-2">{name}</h3>
    <p className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-4 italic">{role}</p>
    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{description}</p>
  </div>
);

const TeamSection: React.FC = () => {
  const team = [
    {
      name: "Nossa Equipe",
      role: "Profissionais Especializados",
      description: "Conte com quem entende. Nossa equipe exclusiva reúne talento, técnica e um olhar atento para destacar sua melhor versão, em um ambiente de total confiança.",
      imageUrl: team1
    },
    {
      name: "Atendimento Acolhedor",
      role: "Cuidado Personalizado",
      description: "Aqui você não é apenas mais uma. Criamos uma experiência de cuidado sob medida, onde cada detalhe é pensado para que você se sinta em casa e plenamente renovada.",
      imageUrl: team2
    },
    {
      name: "Excelência Técnica",
      role: "Resultados Comprovados",
      description: "Aliamos os melhores produtos a protocolos de ponta. Nosso compromisso é com entregas impecáveis que transformam sua autoestima e refletem seu brilho próprio.",
      imageUrl: team3
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Nossa Equipe</SectionTitle>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
          Profissionais dedicados ao seu bem-estar, prontos para proporcionar a melhor experiência em beleza e saúde.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {(Array.isArray(team) ? team : []).map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        <div className="mt-12 text-center bg-gradient-to-r from-brand-dark/5 to-brand-gold/5 p-8 rounded-lg">
          <h3 className="text-2xl font-serif text-brand-dark mb-4">Venha conhecer nossa equipe!</h3>
          <p className="text-gray-600 mb-6">
            Estamos ansiosas para te receber e proporcionar uma experiência única de cuidado e bem-estar.
          </p>
          <a
            href="https://wa.me/5511992153511?text=Olá! Gostaria de conhecer a equipe da La Prime."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors"
          >
            Agendar Visita
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
