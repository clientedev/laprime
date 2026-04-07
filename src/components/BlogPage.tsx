import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/blog/');
                const data = Array.isArray(response.data) ? response.data : [];
                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div className="p-10 md:p-20 text-center font-serif text-xl md:text-2xl text-brand-dark italic">Carregando blog...</div>;
    }

    return (
<<<<<<< HEAD
        <div className="min-h-screen bg-brand-light pt-32 pb-24">
=======
        <div className="min-h-screen bg-brand-light py-16 md:py-24">
>>>>>>> b7126eef233f6504399ed8e8c4336389d5c0d804
            <div className="container mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-dark mb-8 md:mb-12 text-center">Blog La Prime</h1>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {(Array.isArray(posts) && posts.length > 0) ? (
                        posts.map((post: any) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                                {post.imagem_url && (
                                    <img src={post.imagem_url} alt={post.titulo} className="w-full h-40 md:h-48 object-cover" />
                                )}
                                <div className="p-4 md:p-6 flex-grow">
                                    <h2 className="text-lg md:text-2xl font-serif text-brand-dark mb-2">{post.titulo}</h2>
                                    <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-4">{post.conteudo}</p>
                                    <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
                                        <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                                        <Link to={`/blog/${post.id}`} className="text-brand-gold font-semibold hover:underline">
                                            Ler mais
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-lg md:text-xl text-gray-500">Nenhum post encontrado no momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
