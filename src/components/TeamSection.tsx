import React from 'react';

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
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-brand-gold/20">
      <img
        src={imageUrl}
        alt={`${name} - ${role}`}
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-xl font-serif text-brand-dark mb-1">{name}</h3>
    <p className="text-brand-gold font-medium text-sm mb-3">{role}</p>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const TeamSection: React.FC = () => {
  const team = [
    {
      name: "Nossa Equipe",
      role: "Profissionais Especializados",
      description: "Nossa equipe é formada por profissionais altamente qualificados e apaixonados pelo que fazem. Cada membro está em constante atualização para trazer o melhor da beleza e saúde para você.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Atendimento Acolhedor",
      role: "Cuidado Personalizado",
      description: "Acreditamos que cada cliente é único. Por isso, oferecemos um atendimento personalizado e acolhedor, pensando em todas as suas necessidades e desejos.",
      imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Excelência Técnica",
      role: "Resultados Comprovados",
      description: "Combinamos técnica, experiência e produtos de alta qualidade para garantir resultados que elevam sua autoestima e bem-estar.",
      imageUrl: "https://images.unsplash.com/photo-1560869713-da86a9ec0744?q=80&w=400&auto=format&fit=crop"
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
