import React from 'react';

// Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ContactInfoItem: React.FC<{ icon: React.ReactElement; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 text-brand-gold mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-lg text-brand-dark">{title}</h4>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;

const ContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">Agende seu momento de cuidado</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">Estamos prontas para te receber. Entre em contato e reserve seu horário para uma experiência de autocuidado e renovação.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <ContactInfoItem icon={<PhoneIcon />} title="Telefone & WhatsApp">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">(11) 99999-9999</a>
            </ContactInfoItem>
            <ContactInfoItem icon={<MailIcon />} title="E-mail">
              <a href="mailto:contato@laprime.com.br" className="hover:text-brand-gold">contato@laprime.com.br</a>
            </ContactInfoItem>
            <ContactInfoItem icon={<MapPinIcon />} title="Endereço">
              <p>Rua Exemplo, 123 - Bairro Nobre</p>
              <p>São Paulo, SP - CEP 01234-567</p>
            </ContactInfoItem>
          </div>
          <div className="h-96 rounded-lg overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1572455152835-0d09f7a7c932?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Mapa estilizado da localização da clínica La Prime" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
