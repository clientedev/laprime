import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Sparkles } from 'lucide-react';

const PromotionBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [bannerText, setBannerText] = useState('');
    const [style, setStyle] = useState({
        backgroundColor: '#0d2438',
        textColor: '#ffffff',
        fontWeight: 'bold',
        marquee: false,
        speed: 20
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const textRes = await axios.get('/api/settings/promo_text');
                const activeRes = await axios.get('/api/settings/promo_active');
                const styleRes = await axios.get('/api/settings/promo_style');

                if (activeRes.data.value === 'true' || activeRes.data.value === true) {
                    setBannerText(textRes.data.value);
                    if (styleRes.data && styleRes.data.value) {
                        try {
                            const parsedStyle = JSON.parse(styleRes.data.value);
                            setStyle(prev => ({ ...prev, ...parsedStyle }));
                        } catch (e) {
                            console.error("Error parsing promo_style", e);
                        }
                    }
                    setIsVisible(true);
                }
            } catch (error) {
                console.log("Promo banner settings not found or partially set");
            }
        };
        fetchSettings();
    }, []);

    if (!isVisible || !bannerText) return null;

    return (
        <div
            className="text-white py-2 px-4 relative z-[60] overflow-hidden group"
            style={{ backgroundColor: style.backgroundColor, color: style.textColor }}
        >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className={`container mx-auto flex items-center justify-center gap-3 relative z-10 ${style.marquee ? 'overflow-hidden whitespace-nowrap' : ''}`}>
                <div className={style.marquee ? 'flex animate-marquee' : 'flex items-center gap-3'}
                    style={style.marquee ? { animationDuration: `${style.speed}s` } : {}}
                >
                    <Sparkles className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />
                    <p className={`text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-center ${style.fontWeight === 'bold' ? 'font-black' : 'font-normal'}`}>
                        {bannerText}
                    </p>
                    <Sparkles className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />

                    {/* Duplicate for seamless marquee */}
                    {style.marquee && (
                        <>
                            <span className="mx-10 shrink-0 opacity-0 md:opacity-100"></span>
                            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />
                            <p className={`text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-center ${style.fontWeight === 'bold' ? 'font-black' : 'font-normal'}`}>
                                {bannerText}
                            </p>
                            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />
                        </>
                    )}
                </div>
            </div>

            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1 z-20"
                aria-label="Fechar"
            >
                <X className="w-3 h-3" />
            </button>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                }
            `}} />
        </div>
    );
};

export default PromotionBanner;
