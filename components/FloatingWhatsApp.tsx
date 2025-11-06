
import React from 'react';

const FloatingWhatsApp: React.FC = () => {
    return (
        <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
            aria-label="Contact us on WhatsApp"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="currentColor"
            >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459l-6.279 1.658zm5.553-4.421l.338.194c1.495.862 3.232 1.32 5.031 1.32 5.478 0 9.961-4.483 9.961-9.961 0-5.478-4.483-9.961-9.961-9.961s-9.961 4.483-9.961 9.961c0 1.83.495 3.593 1.399 5.094l.206.354-1.25 4.562 4.64-1.241z"/>
            </svg>
        </a>
    );
};

export default FloatingWhatsApp;
