
import React from 'react';

const QuoteIcon = () => (
    <svg className="w-10 h-10 text-brand-gold/20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
);

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col h-full">
        <QuoteIcon />
        <p className="text-gray-600 italic my-4 flex-grow">"{quote}"</p>
        <p className="font-semibold font-serif text-brand-dark text-right">- {author}</p>
    </div>
);

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        { quote: "A La Prime transformou minha autoestima. O atendimento é impecável e os resultados superaram minhas expectativas. Luxo com preço que a gente pode pagar!", author: "Juliana S." },
        { quote: "Finalmente encontrei um lugar que reúne tudo que preciso! Da manicure ao botox, a qualidade é incrível. Me sinto em casa e muito bem cuidada.", author: "Fernanda M." },
        { quote: "O ambiente é lindo, relaxante e a equipe é super acolhedora. Fiz meu preenchimento e amei o resultado, ficou super natural. Recomendo de olhos fechados!", author: "Carla P." }
    ];

    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4 text-center">O que nossas clientes dizem</h2>
                <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
                    A confiança e a satisfação de quem passa por aqui é nossa maior inspiração.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
