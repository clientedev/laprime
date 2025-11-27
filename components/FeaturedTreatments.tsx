import React from 'react';
import criolipoliseImg from '@assets/stock_images/woman_body_sculpting_7498ff6a.jpg';
import botoxImg from '@assets/stock_images/botox_injection_faci_370000f9.jpg';
import preenchimentoImg from '@assets/stock_images/dermal_filler_lip_in_c408a9e9.jpg';

const TreatmentCard: React.FC<{ image: string; title: string; description: string; alt: string; }> = ({ image, title, description, alt }) => (
    <div className="relative group overflow-hidden rounded-lg shadow-xl">
        <img src={image} alt={alt} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-serif font-bold text-brand-gold">{title}</h3>
            <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">{description}</p>
        </div>
    </div>
);


const FeaturedTreatments: React.FC = () => {
    const treatments = [
        {
            image: criolipoliseImg,
            title: "Criolipólise",
            description: "Reduza a gordura localizada de forma eficaz e segura. Um tratamento inovador para esculpir seu corpo sem cirurgia.",
            alt: "Tratamento de Criolipólise para contorno corporal"
        },
        {
            image: botoxImg,
            title: "Botox",
            description: "Suavize rugas e linhas de expressão, rejuvenescendo sua aparência com naturalidade e precisão.",
            alt: "Mulher com pele rejuvenescida após tratamento com Botox"
        },
        {
            image: preenchimentoImg,
            title: "Preenchimento",
            description: "Restaure o volume, contorno e hidratação da pele, realçando seus traços de maneira sutil e elegante.",
            alt: "Aplicação de preenchimento facial para harmonização"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4 text-center">Tratamentos em Destaque</h2>
                <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
                    Conheça nossas especialidades e os tratamentos mais procurados para resultados visíveis e que elevam a autoestima.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {treatments.map((treatment, index) => (
                        <TreatmentCard key={index} {...treatment} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTreatments;
