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
                const timestamp = Date.now();
                const [textRes, activeRes, styleRes] = await Promise.all([
                    axios.get(`/api/settings/promo_text?t=${timestamp}`),
                    axios.get(`/api/settings/promo_active?t=${timestamp}`),
                    axios.get(`/api/settings/promo_style?t=${timestamp}`)
                ]);

                const active = activeRes.data.value === 'true' || activeRes.data.value === true;
                setBannerText(textRes.data.value || '');

                if (active && styleRes.data && styleRes.data.value) {
                    try {
                        const parsedStyle = JSON.parse(styleRes.data.value);
                        setStyle(prev => ({ ...prev, ...parsedStyle }));
                    } catch (e) {
                        console.error("Error parsing promo_style", e);
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

            <div className={`container mx-auto flex items-center justify-center relative z-10 ${style.marquee ? 'overflow-hidden whitespace-nowrap' : ''}`}>
                <div
                    className={style.marquee ? 'inline-flex animate-marquee whitespace-nowrap' : 'flex items-center gap-3 justify-center'}
                    style={style.marquee ? { animationDuration: `${style.speed}s` } : {}}
                >
                    {/* Items */}
                    {[...Array(style.marquee ? 6 : 1)].map((_, i) => (
                        <div key={i} className="flex items-center justify-center gap-3 mx-4 md:mx-8">
                            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />
                            <p className={`text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-center ${style.fontWeight === 'bold' ? 'font-black' : 'font-normal'}`}>
                                {bannerText}
                            </p>
                            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1 z-20 bg-black/10 rounded-full"
                aria-label="Fechar"
            >
                <X className="w-4 h-4" />
            </button>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                    min-width: 200%;
                }
            `}} />
        </div>
    );
};

export default PromotionBanner;
