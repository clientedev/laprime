import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const BinaChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputVal, setInputVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Welcome message from Bina
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: 'Olá! Sou a Bina, a especialista virtual da Clínica La Prime ✨ Como posso ajudar a realçar a sua beleza hoje?'
            }]);
        }
    }, [isOpen]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!inputVal.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: inputVal };
        const newHistory = [...messages, userMessage];
        setMessages(newHistory);
        setInputVal('');
        setIsLoading(true);

        try {
            const response = await axios.post('/api/chat/', {
                messages: newHistory.filter(m => m.role !== 'system') // send only conversation history to backend
            });

            setMessages([...newHistory, { role: 'assistant', content: response.data.reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages([...newHistory, { role: 'assistant', content: 'Ops, tive um errinho de conexão. Poderia chamar a nossa equipe no WhatsApp clicando no botão no menu?' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Button */}
            <div
                className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative w-16 h-16 bg-brand-dark rounded-full shadow-2xl flex items-center justify-center group hover:bg-brand-gold hover:scale-110 transition-all duration-300 border-2 border-brand-gold/30"
                    aria-label="Converse com a Bina"
                >
                    <div className="absolute inset-0 rounded-full animate-ping bg-brand-gold/20"></div>
                    <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-brand-gold animate-pulse" />
                    <MessageCircle className="w-8 h-8 text-brand-gold group-hover:text-brand-dark transition-colors" />
                </button>

                {/* Floating Tooltip */}
                <div className={`absolute bottom-full right-0 mb-4 whitespace-nowrap bg-white text-brand-dark px-4 py-2 rounded-2xl shadow-xl border border-brand-gold/20 font-sans font-bold text-sm transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="flex items-center gap-2">
                        <span>✨ Fale com a Bina!</span>
                    </div>
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-brand-gold/20 transform rotate-45"></div>
                </div>
            </div>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 sm:w-80 w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-brand-gold/20 z-50 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>

                {/* Header */}
                <div className="bg-brand-dark p-4 flex items-center justify-between border-b border-brand-gold/20 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-xl overflow-hidden border border-brand-gold">
                                👩🏼‍⚕️
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-brand-dark rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="text-white font-serif font-bold leading-tight">Bina</h3>
                            <p className="text-brand-gold text-[10px] uppercase font-black tracking-wider">Especialista La Prime</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                                        ? 'bg-brand-dark text-white rounded-tr-sm'
                                        : 'bg-white text-gray-700 border border-brand-gold/10 rounded-tl-sm'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start">
                            <div className="bg-white border border-brand-gold/10 p-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center">
                                <div className="w-1.5 h-1.5 bg-brand-gold/50 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-brand-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                <div className="w-1.5 h-1.5 bg-brand-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                    <div className="flex items-center gap-2 bg-[#f9fafb] p-1.5 rounded-full border border-gray-200 focus-within:border-brand-gold/50 transition-colors">
                        <input
                            type="text"
                            value={inputVal}
                            onChange={e => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Pergunte sobre serviços..."
                            className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-brand-dark placeholder:text-gray-400"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputVal.trim() || isLoading}
                            className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark hover:bg-yellow-500 disabled:opacity-50 disabled:hover:bg-brand-gold transition-colors shrink-0"
                        >
                            <Send className="w-4 h-4 -ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BinaChatbot;
