import React from 'react';
import Logo from './Logo';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-white pt-10 md:pt-16 pb-6 md:pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 text-center md:text-left">
                    <div className="col-span-2 md:col-span-2 lg:col-span-1 mb-2 md:mb-0 flex flex-col items-center md:items-start">
                        <Logo className="w-28 md:w-36 h-auto" />
                        <p className="mt-3 md:mt-4 text-gray-400 text-xs md:text-sm">Promovendo autocuidado, saúde e autoestima.</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-serif tracking-wider mb-3 md:mb-4 text-sm md:text-base">Links Rápidos</h4>
                        <ul className="space-y-1 md:space-y-2">
                            <li><a href="#about" className="text-gray-400 hover:text-brand-gold text-xs md:text-sm">Sobre</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-brand-gold text-xs md:text-sm">Serviços</a></li>
                            <li><a href="#testimonials" className="text-gray-400 hover:text-brand-gold text-xs md:text-sm">Depoimentos</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-brand-gold text-xs md:text-sm">Contato</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-serif tracking-wider mb-3 md:mb-4 text-sm md:text-base">Contato</h4>
                        <ul className="space-y-1 md:space-y-2 text-gray-400 text-xs md:text-sm">
                            <li>(11) 99215-3511</li>
                            <li>ladinie.mkt@gmail.com</li>
                            <li>Rua Clovis da Cunha Castro, nº 5</li>
                            <li>São Paulo, SP</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-serif tracking-wider mb-3 md:mb-4 text-sm md:text-base">Horário</h4>
                        <ul className="space-y-1 md:space-y-2 text-gray-400 text-xs md:text-sm">
                            <li>Ter - Sáb: 10h às 20h</li>
                            <li className="text-gray-500">Dom e Seg: Fechado</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-500 gap-3">
                    <p>&copy; {new Date().getFullYear()} La Dinie. Todos os direitos reservados.</p>
                    <div className="flex space-x-4">
                        <SocialIcon href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
