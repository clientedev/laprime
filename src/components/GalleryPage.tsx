import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get('/gallery/');
                const data = Array.isArray(response.data) ? response.data : [];
                setImages(data);
            } catch (error) {
                console.error('Erro ao buscar galeria:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (loading) {
        return <div className="p-20 text-center font-serif text-2xl text-brand-dark italic">Carregando galeria...</div>;
    }

    return (
        <div className="min-h-screen bg-brand-light py-24">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-serif text-brand-dark mb-12 text-center">Nossa Galeria</h1>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.length > 0 ? (
                        {(Array.isArray(images) ? images : []).map((img: any) => (
                            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg shadow-md">
                                <img src={img.url} alt={img.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                {(img.titulo || img.descricao) && (
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <h3 className="text-white font-semibold">{img.titulo}</h3>
                                        <p className="text-gray-200 text-xs">{img.descricao}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-xl text-gray-500">Galeria sendo preparada em breve!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
