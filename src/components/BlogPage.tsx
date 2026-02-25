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
                setPosts(response.data);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div className="p-20 text-center font-serif text-2xl text-brand-dark italic">Carregando blog...</div>;
    }

    return (
        <div className="min-h-screen bg-brand-light py-24">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-serif text-brand-dark mb-12 text-center">Blog La Prime</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                                {post.imagem_url && (
                                    <img src={post.imagem_url} alt={post.titulo} className="w-full h-48 object-cover" />
                                )}
                                <div className="p-6 flex-grow">
                                    <h2 className="text-2xl font-serif text-brand-dark mb-2">{post.titulo}</h2>
                                    <p className="text-gray-600 line-clamp-3 mb-4">{post.conteudo}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
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
                            <p className="text-xl text-gray-500">Nenhum post encontrado no momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
