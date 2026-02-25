import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

const BlogPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/blog/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Erro ao buscar post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <div className="p-20 text-center font-serif text-2xl text-brand-dark italic">Carregando artigo...</div>;
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-serif text-brand-dark mb-4">Artigo não encontrado</h1>
                <Link to="/blog" className="text-brand-gold hover:underline">Voltar para o blog</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-light py-24">
            <div className="max-w-4xl mx-auto px-4 bg-white p-8 md:p-12 rounded-lg shadow-sm">
                <Link to="/blog" className="inline-flex items-center text-brand-gold hover:underline mb-8">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar ao blog
                </Link>

                {post.imagem_url && (
                    <img src={post.imagem_url} alt={post.titulo} className="w-full h-80 object-cover rounded-lg mb-8" />
                )}

                <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">{post.titulo}</h1>
                <div className="text-sm text-gray-500 mb-8 pb-4 border-b">
                    Postado em {new Date(post.created_at).toLocaleDateString('pt-BR')}
                </div>

                <div className="prose prose-lg max-w-none text-brand-text whitespace-pre-wrap">
                    {post.conteudo}
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;
