
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteIcon = () => (
    <svg className="w-10 h-10 text-brand-gold/20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
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
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ nome_cliente: '', rating: 5, comentario: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews/?approved_only=true');
                setReviews(response.data);
            } catch (error) {
                console.error('Erro ao buscar avaliações:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/reviews/', formData);
            setSubmitted(true);
            setFormData({ nome_cliente: '', rating: 5, comentario: '' });
            setTimeout(() => {
                setSubmitted(false);
                setShowForm(false);
            }, 3000);
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
        }
    };

    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4 text-center">O que nossas clientes dizem</h2>
                <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
                    A confiança e a satisfação de quem passa por aqui é nossa maior inspiração.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500 italic">Carregando avaliações...</div>
                    ) : reviews.length > 0 ? (
                        reviews.map((testimonial: any, index) => (
                            <TestimonialCard key={index} quote={testimonial.comentario} author={testimonial.nome_cliente} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">Ainda não há avaliações aprovadas. Seja a primeira!</div>
                    )}
                </div>

                <div className="text-center">
                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-brand-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors"
                        >
                            Deixar minha avaliação
                        </button>
                    ) : (
                        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md text-left">
                            {submitted ? (
                                <div className="text-green-600 font-semibold mb-4 text-center text-lg">
                                    Obrigada! Sua avaliação foi enviada e será exibida após aprovação.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.nome_cliente}
                                            onChange={(e) => setFormData({ ...formData, nome_cliente: e.target.value })}
                                            className="w-full border rounded-md px-3 py-2 bg-brand-light/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nota (1-5)</label>
                                        <select
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                            className="w-full border rounded-md px-3 py-2 bg-brand-light/20"
                                        >
                                            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} estrelas</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Comentário</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.comentario}
                                            onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                                            className="w-full border rounded-md px-3 py-2 bg-brand-light/20"
                                        ></textarea>
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="submit" className="flex-grow bg-brand-gold text-white py-2 rounded-md hover:bg-brand-dark transition-colors">Enviar</button>
                                        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancelar</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
