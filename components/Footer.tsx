import React from 'react';
import Logo from './Logo';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                    <div className="md:col-span-2 lg:col-span-1 mb-6 md:mb-0">
                        <div className="inline-block mx-auto md:mx-0">
                          <Logo className="w-36 text-brand-gold" />
                        </div>
                        <p className="mt-4 text-gray-400 text-sm">Promovendo autocuidado, saúde e autoestima.</p>
                    </div>
                    <div>
                        <h4 className="font-bold font-serif tracking-wider mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li><a href="#about" className="text-gray-400 hover:text-brand-gold">Sobre</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-brand-gold">Serviços</a></li>
                            <li><a href="#testimonials" className="text-gray-400 hover:text-brand-gold">Depoimentos</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-brand-gold">Contato</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-serif tracking-wider mb-4">Contato</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>(11) 99999-9999</li>
                            <li>contato@laprime.com.br</li>
                            <li>Rua Exemplo, 123, São Paulo</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-serif tracking-wider mb-4">Horário</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Seg - Sex: 9h às 20h</li>
                            <li>Sábado: 9h às 18h</li>
                            <li>Domingo: Fechado</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} La Prime. Todos os direitos reservados.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <SocialIcon href="#">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </SocialIcon>
                         <SocialIcon href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </SocialIcon>
                         <SocialIcon href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.716-2.011-4.464-2.011-3.461 0-6.236 2.809-6.236 6.265 0 .49.055.97.163 1.436-5.184-.259-9.774-2.766-12.848-6.529-.537.92-.845 1.99-.845 3.125 0 2.169 1.102 4.083 2.78 5.197-.99-.031-1.921-.303-2.735-.756v.079c0 3.029 2.155 5.556 5.013 6.129-.523.142-1.074.219-1.649.219-.402 0-.792-.039-1.173-.111 1.057 2.482 3.42 4.298 6.426 4.348-2.14 1.681-4.825 2.682-7.75 2.682-.503 0-.999-.029-1.486-.086 2.767 1.778 6.075 2.813 9.646 2.813 11.573 0 17.915-9.593 17.915-17.929 0-.273-.006-.546-.018-.817.989-.714 2.21-1.606 2.766-2.61z"></path></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
