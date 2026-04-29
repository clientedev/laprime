import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X, Send, Sparkles, User, Bot, CheckCircle, LogIn, UserPlus, ArrowRight, ChevronLeft, Clock, DollarSign } from 'lucide-react';

interface Message {
    id: number;
    from: 'bot' | 'user';
    text: string;
    options?: { label: string; value: any; description?: string }[];
    inputType?: 'text' | 'email' | 'tel';
    inputKey?: string;
}

interface ConversationalAppointmentProps {
    onClose: () => void;
}

type Step =
    | 'auth_choice'
    | 'login_email' | 'login_senha' | 'logging_in'
    | 'guest_nome' | 'guest_email' | 'guest_telefone'
    | 'select_service' | 'select_professional' | 'select_date' | 'select_time'
    | 'confirm' | 'done' | 'error';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const ConversationalAppointment: React.FC<ConversationalAppointmentProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState<Step>('auth_choice');
    const [stepHistory, setStepHistory] = useState<Step[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [inputKey, setInputKey] = useState<string | null>(null);
    const [inputType, setInputType] = useState<'text' | 'email' | 'tel'>('text');
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgId, setMsgId] = useState(0);

    // Data collected
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [guestData, setGuestData] = useState<{ nome?: string; email?: string; telefone?: string }>({});
    const [loginData, setLoginData] = useState<{ email?: string; senha?: string }>({});
    const [services, setServices] = useState<any[]>([]);
    const [professionals, setProfessionals] = useState<any[]>([]);
    const [availabilities, setAvailabilities] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    const bottomRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    // Progress calculation
    const stepsOrder: Step[] = ['auth_choice', 'guest_nome', 'select_service', 'select_professional', 'select_date', 'select_time', 'confirm', 'done'];
    const currentStepIndex = stepsOrder.indexOf(step) !== -1 ? stepsOrder.indexOf(step) : 0;
    const progress = Math.min(((currentStepIndex + 1) / stepsOrder.length) * 100, 100);

    const addBotMessage = async (text: string, opts?: { options?: { label: string; value: any; description?: string }[]; inputType?: 'text' | 'email' | 'tel'; inputKey?: string }) => {
        await delay(400);
        setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            from: 'bot',
            text,
            ...opts
        }]);
        if (opts?.inputKey) {
            setInputKey(opts.inputKey);
            setInputType(opts.inputType || 'text');
            setShowInput(true);
        }
    };

    const addUserMessage = (text: string) => {
        setMessages(prev => [...prev, { id: Date.now() + Math.random(), from: 'user', text }]);
        setShowInput(false);
        setInputValue('');
    };

    const handleBack = async () => {
        if (stepHistory.length === 0) return;
        const previousStep = stepHistory[stepHistory.length - 1];
        setStepHistory(prev => prev.slice(0, -1));
        setStep(previousStep);
        await addBotMessage('Sem problemas! Vamos voltar um passo. ↩️');

        // Logic to clear relevant data when going back could be added here if needed
        if (previousStep === 'select_service') setSelectedService(null);
        if (previousStep === 'select_professional') setSelectedProfessional(null);
        if (previousStep === 'select_date') setSelectedDate(null);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, showInput]);

    // Initial greeting
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            const loggedIn = !!localStorage.getItem('token');
            await addBotMessage('Olá! ✨ Seja bem-vinda à La Dinie. Estou aqui para te ajudar a agendar seu horário com toda comodidade!');
            await delay(600);
            if (loggedIn) {
                await addBotMessage('Vejo que você já tem uma conta. Deseja continuar com ela ou prefere usar outra opção?', {
                    options: [
                        { label: '✅ Continuar com minha conta', value: 'logged' },
                        { label: '👤 Agendar como convidada', value: 'guest' },
                    ]
                });
                setStep('auth_choice');
            } else {
                await addBotMessage('Para agendar, como você prefere prosseguir?', {
                    options: [
                        { label: '🔐 Fazer login', value: 'login' },
                        { label: '📝 Criar conta', value: 'register' },
                        { label: '⚡ Agendar sem cadastro', value: 'guest' },
                    ]
                });
                setStep('auth_choice');
            }
        };
        init();
    }, []);

    const handleOption = async (value: any) => {
        setStepHistory(prev => [...prev, step]);
        if (step === 'auth_choice') {
            if (value === 'logged') {
                addUserMessage('Continuar com minha conta');
                await delay(300);
                await startBookingFlow();
            } else if (value === 'login') {
                addUserMessage('Fazer login');
                await addBotMessage('Ótimo! Qual é o seu e-mail de acesso?', { inputKey: 'login_email', inputType: 'email' });
                setStep('login_email');
            } else if (value === 'register') {
                addUserMessage('Criar conta');
                await addBotMessage('Vou te redirecionar para o cadastro. Após criar sua conta, volte aqui para agendar! 😊');
                await delay(1500);
                window.location.href = '/register';
            } else if (value === 'guest') {
                addUserMessage('Agendar sem cadastro');
                await addBotMessage('Sem problema! Vou precisar de algumas informações. Qual é o seu nome completo?', { inputKey: 'guest_nome', inputType: 'text' });
                setStep('guest_nome');
            }
        } else if (step === 'select_service') {
            const svc = services.find(s => s.id === value);
            addUserMessage(svc?.nome || value);
            setSelectedService(svc);
            await loadProfessionals(svc);
        } else if (step === 'select_professional') {
            const prof = professionals.find(p => p.id === value);
            addUserMessage(prof?.nome || prof?.especialidade || value);
            setSelectedProfessional(prof);
            await loadDates(prof);
        } else if (step === 'select_date') {
            addUserMessage(new Date(value + 'T12:00:00').toLocaleDateString('pt-BR'));
            setSelectedDate(value);
            await loadTimes(value);
        } else if (step === 'select_time') {
            addUserMessage(value);
            setSelectedTime(value);
            await showConfirmation(value);
        } else if (step === 'confirm') {
            if (value === 'yes') {
                addUserMessage('Sim, confirmar!');
                await submitAppointment();
            } else {
                addUserMessage('Não, cancelar');
                await addBotMessage('Tudo bem! Quando quiser agendar, é só clicar no botão novamente. Até logo! 👋');
                await delay(1500);
                onClose();
            }
        }
    };

    const handleInputSubmit = async () => {
        if (!inputValue.trim()) return;
        const val = inputValue.trim();
        setStepHistory(prev => [...prev, step]);

        if (step === 'login_email') {
            addUserMessage(val);
            setLoginData(prev => ({ ...prev, email: val }));
            await addBotMessage('Perfeito! Agora me diga sua senha:', { inputKey: 'login_senha', inputType: 'text' });
            setStep('login_senha');
        } else if (step === 'login_senha') {
            addUserMessage('••••••••');
            setLoginData(prev => ({ ...prev, senha: val }));
            await performLogin(loginData.email!, val);
        } else if (step === 'guest_nome') {
            addUserMessage(val);
            setGuestData(prev => ({ ...prev, nome: val }));
            await addBotMessage(`Prazer, ${val.split(' ')[0]}! 😊 Qual é o seu e-mail?`, { inputKey: 'guest_email', inputType: 'email' });
            setStep('guest_email');
        } else if (step === 'guest_email') {
            addUserMessage(val);
            setGuestData(prev => ({ ...prev, email: val }));
            await addBotMessage('Ótimo! E o seu WhatsApp com DDD? (Ex: 11999999999)', { inputKey: 'guest_telefone', inputType: 'tel' });
            setStep('guest_telefone');
        } else if (step === 'guest_telefone') {
            addUserMessage(val);
            setGuestData(prev => ({ ...prev, telefone: val }));
            await startBookingFlow();
        }
    };

    const performLogin = async (email: string, senha: string) => {
        setLoading(true);
        await addBotMessage('Verificando suas credenciais... 🔄');
        try {
            const res = await axios.post('/api/auth/login', { email, senha });
            const newToken = res.data.access_token;
            localStorage.setItem('token', newToken);
            setToken(newToken);
            await addBotMessage('Login realizado com sucesso! ✅ Vamos ao agendamento!');
            await startBookingFlow();
        } catch {
            await addBotMessage('Hmm, não consegui encontrar essa conta. Deseja tentar novamente ou agendar como convidada?', {
                options: [
                    { label: '🔄 Tentar novamente', value: 'login' },
                    { label: '⚡ Agendar sem cadastro', value: 'guest' },
                ]
            });
            setStep('auth_choice');
        } finally {
            setLoading(false);
        }
    };

    const startBookingFlow = async () => {
        setLoading(true);
        await addBotMessage('Perfeito! Agora vamos escolher seu serviço. Um momento... ✨');
        try {
            const res = await axios.get('/api/services/');
            // Agrupar por nome para evitar duplicatas no menu inicial
            const uniqueServices: any[] = [];
            const seenNames = new Set();

            res.data.forEach((s: any) => {
                if (!seenNames.has(s.nome)) {
                    uniqueServices.push(s);
                    seenNames.add(s.nome);
                }
            });

            setServices(uniqueServices);

            if (uniqueServices.length === 0) {
                await addBotMessage('Ops! Não há serviços disponíveis no momento. Entre em contato conosco pelo WhatsApp!');
                setStep('error');
                return;
            }
            await addBotMessage('Que tipo de serviço você deseja?', {
                options: (Array.isArray(uniqueServices) ? uniqueServices : []).map((s: any) => ({
                    label: `${s.nome} — R$ ${Number(s.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${s.duracao}min)`,
                    value: s.id
                }))
            });
            setStep('select_service');
        } catch {
            await addBotMessage('Tive um problema ao carregar os serviços. Tente novamente mais tarde.');
            setStep('error');
        } finally {
            setLoading(false);
        }
    };

    const loadProfessionals = async (svc: any) => {
        setLoading(true);
        await addBotMessage(`Ótima escolha! Agora vamos escolher sua especialista para ${svc.nome}. 💅`);
        try {
            const res = await axios.get('/api/professionals/');
            // Filtrar apenas profissionais que oferecem este serviço específico pelo NOME
            const filtered = res.data.filter((p: any) =>
                p.ativo && p.services && p.services.some((s: any) => s.nome === svc.nome)
            );

            setProfessionals(filtered);
            if (filtered.length === 0) {
                await addBotMessage('Não há profissionais disponíveis para este serviço no momento. Escolha outro serviço?', {
                    options: [{ label: '⬅️ Voltar aos serviços', value: 'back' }]
                });
                setStep('select_service');
                return;
            }
            await addBotMessage('Com qual especialista você prefere?', {
                options: (Array.isArray(filtered) ? filtered : []).map((p: any) => ({
                    label: `✨ ${p.nome || p.especialidade} (${p.especialidade})`,
                    value: p.id,
                    description: 'Especialista dedicada ao seu bem-estar.'
                }))
            });
            setStep('select_professional');
        } catch {
            await addBotMessage('Erro ao carregar profissionais.');
            setStep('error');
        } finally {
            setLoading(false);
        }
    };

    const loadDates = async (prof: any) => {
        setLoading(true);
        await addBotMessage('Verificando os horários disponíveis... 📅');
        try {
            const res = await axios.get(`/api/availability/${prof.id}`);
            setAvailabilities(res.data);
            const dates = [...new Set<string>((Array.isArray(res.data) ? res.data : []).map((a: any) => new Date(a.data).toISOString().split('T')[0]))];
            if (dates.length === 0) {
                await addBotMessage('Não há datas disponíveis para esta profissional no momento. Escolha outra?', {
                    options: [{ label: '⬅️ Escolher outra profissional', value: 'back' }]
                });
                setStep('select_professional');
                return;
            }
            await addBotMessage('Que dia você prefere?', {
                options: (Array.isArray(dates) ? dates : []).map(d => ({
                    label: new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }),
                    value: d
                }))
            });
            setStep('select_date');
        } catch {
            await addBotMessage('Erro ao carregar disponibilidade.');
            setStep('error');
        } finally {
            setLoading(false);
        }
    };

    const loadTimes = async (date: string) => {
        setLoading(true);
        try {
            // Fetch busy slots for this professional and date (public endpoint)
            const apptsRes = await axios.get(`/api/appointments/busy-slots?professional_id=${selectedProfessional.id}&data=${date}`);
            const busySlots = apptsRes.data;

            const ranges = availabilities.filter(a => new Date(a.data).toISOString().split('T')[0] === date);

            if (ranges.length === 0) {
                await addBotMessage('Não há horários neste dia. Escolha outra data?', {
                    options: [{ label: '⬅️ Escolher outra data', value: 'back' }]
                });
                setStep('select_date');
                return;
            }

            // Generate slots based on service duration
            const duration = selectedService.duracao || 30;
            const slots: string[] = [];

            ranges.forEach(range => {
                let current = new Date(`${date}T${range.hora_inicio}`);
                const end = new Date(`${date}T${range.hora_fim}`);

                while (current < end) {
                    const timeStr = current.toTimeString().substring(0, 5);
                    const slotEnd = new Date(current.getTime() + duration * 60000);
                    const slotEndStr = slotEnd.toTimeString().substring(0, 5);

                    // Must fit within the availability range
                    if (slotEndStr > range.hora_fim) {
                        break;
                    }

                    // Must not overlap any busy slot
                    // (Simple check: is any busy slot START TIME between our start and end?)
                    const isBusy = busySlots.some((bsTime: string) => {
                        return bsTime >= timeStr && bsTime < slotEndStr;
                    });

                    if (!isBusy) {
                        slots.push(timeStr);
                    }

                    // Move to the next 30-min slot or next available slot?
                    // Typically we allow starting every 30 mins even if service is 60 mins
                    current.setMinutes(current.getMinutes() + 30);
                }
            });

            if (slots.length === 0) {
                await addBotMessage('Infelizmente todos os horários deste dia já foram preenchidos. Escolha outra data?', {
                    options: [{ label: '⬅️ Escolher outra data', value: 'back' }]
                });
                setStep('select_date');
                return;
            }

            await addBotMessage('Que horário fica melhor para você? ⏰', {
                options: (Array.isArray(slots) ? slots : []).map(t => ({
                    label: `🕐 ${t}`,
                    value: t
                }))
            });
            setStep('select_time');
        } catch (error) {
            console.error('Error generating slots:', error);
            await addBotMessage('Erro ao carregar horários disponíveis.');
        } finally {
            setLoading(false);
        }
    };

    const showConfirmation = async (time: string) => {
        const dateFormatted = new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
        await addBotMessage(
            `Perfeito! Vou confirmar seu agendamento:\n\n` +
            `📋 **Serviço:** ${selectedService?.nome}\n` +
            `👩‍💼 **Profissional:** ${selectedProfessional?.nome || selectedProfessional?.especialidade}\n` +
            `📅 **Data:** ${dateFormatted}\n` +
            `⏰ **Horário:** ${time}\n\n` +
            `Posso confirmar?`,
            {
                options: [
                    { label: '✅ Sim, confirmar!', value: 'yes' },
                    { label: '❌ Não, cancelar', value: 'no' },
                ]
            }
        );
        setStep('confirm');
    };

    const submitAppointment = async () => {
        setLoading(true);
        await addBotMessage('Registrando seu agendamento... ⏳');
        try {
            const currentToken = localStorage.getItem('token');
            const headers: any = {};
            if (currentToken) headers['Authorization'] = `Bearer ${currentToken}`;

            const payload: any = {
                service_id: selectedService.id,
                professional_id: selectedProfessional.id,
                data: new Date(selectedDate + 'T12:00:00').toISOString(),
                hora: selectedTime,
            };

            if (!currentToken) {
                payload.guest_nome = guestData.nome;
                payload.guest_email = guestData.email;
                payload.guest_telefone = guestData.telefone;
            }

            await axios.post('/api/appointments/', payload, { headers });

            await addBotMessage('🎉 Agendamento realizado com sucesso! Nossa equipe irá confirmar em breve. Você receberá uma mensagem no WhatsApp!');
            await delay(500);
            await addBotMessage('Até logo e obrigada por escolher a La Dinie! 💛✨');
            setStep('done');
        } catch (err: any) {
            const detail = err.response?.data?.detail || 'Erro desconhecido';
            await addBotMessage(`Ops! Não consegui finalizar: ${detail}. Tente novamente ou entre em contato conosco.`);
            setStep('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: '90vh' }}>
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0d2438] to-[#1a3a52] px-6 py-5 flex flex-col gap-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {stepHistory.length > 0 && step !== 'done' && (
                                <button
                                    onClick={handleBack}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                                    title="Voltar"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            )}
                            <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-inner">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold font-serif text-lg tracking-tight">La Dinie</h2>
                                <p className="text-brand-gold/80 text-xs font-sans uppercase tracking-[0.2em]">Exclusividade</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1 group">
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    {step !== 'done' && (
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-brand-gold h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(189,160,126,0.6)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-[#f8f5f0]">
                    {(Array.isArray(messages) ? messages : []).map((msg) => (
                        <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                            {msg.from === 'bot' && (
                                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div className={`max-w-[80%] ${msg.from === 'user' ? 'order-first' : ''}`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm font-sans leading-relaxed whitespace-pre-line ${msg.from === 'bot'
                                    ? 'bg-white text-brand-dark shadow-sm rounded-tl-none'
                                    : 'bg-brand-dark text-white rounded-tr-none'
                                    }`}>
                                    {msg.text}
                                </div>
                                {msg.options && (
                                    <div className={`mt-3 flex flex-col gap-2 ${step === 'select_service' ? 'sm:grid sm:grid-cols-2' : ''}`}>
                                        {(Array.isArray(msg.options) ? msg.options : []).map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleOption(opt.value)}
                                                disabled={loading || step === 'done'}
                                                className={`text-left p-4 bg-white border-2 border-transparent hover:border-brand-gold hover:bg-brand-gold/5 rounded-2xl group transition-all duration-300 disabled:opacity-40 shadow-sm hover:shadow-md flex flex-col gap-2 relative overflow-hidden`}
                                            >
                                                {step === 'select_service' && (
                                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                                        <Sparkles className="w-12 h-12 text-brand-dark" />
                                                    </div>
                                                )}
                                                <span className="font-serif font-bold text-brand-dark group-hover:text-brand-gold transition-colors">{opt.label}</span>
                                                {opt.description && (
                                                    <p className="text-xs text-brand-text/70 font-sans leading-relaxed">
                                                        {opt.description}
                                                    </p>
                                                )}
                                                {step === 'select_service' && opt.label.includes('—') && (
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <div className="flex items-center gap-1 text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                                                            <DollarSign className="w-3 h-3" />
                                                            PREÇO SOB CONSULTA
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {msg.from === 'user' && (
                                <div className="w-8 h-8 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start gap-2">
                            <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                                <div className="flex gap-1 items-center h-4">
                                    <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Input area */}
                {showInput && !loading && (
                    <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 flex-shrink-0">
                        <input
                            type={inputType === 'tel' ? 'tel' : inputType === 'email' ? 'email' : 'text'}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleInputSubmit()}
                            placeholder={
                                inputKey === 'login_email' ? 'seu@email.com' :
                                    inputKey === 'login_senha' ? 'Sua senha...' :
                                        inputKey === 'guest_nome' ? 'Seu nome completo' :
                                            inputKey === 'guest_email' ? 'seu@email.com' :
                                                inputKey === 'guest_telefone' ? '11999999999' : 'Digite aqui...'
                            }
                            className="flex-1 px-4 py-2.5 bg-brand-light rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold border border-transparent"
                            autoFocus
                        />
                        <button
                            onClick={handleInputSubmit}
                            disabled={!inputValue.trim()}
                            className="w-10 h-10 bg-brand-dark text-white rounded-xl flex items-center justify-center hover:bg-brand-gold transition-colors disabled:opacity-40"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {step === 'done' && (
                    <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-xl text-sm hover:bg-brand-dark hover:text-white transition-all"
                        >
                            Fechar ✨
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationalAppointment;
