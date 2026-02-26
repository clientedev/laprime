import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, Scissors, Heart, CheckCircle, MapPin, Star } from 'lucide-react';

const AppointmentForm = ({ onSuccess }) => {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [formData, setFormData] = useState({
    service_id: '',
    professional_id: '',
    data: '',
    hora: ''
  });
  const [busySlots, setBusySlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          axios.get('/api/services/'),
          axios.get('/api/professionals/')
        ]);
        setServices(sRes.data);
        setProfessionals(pRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados');
      }
    };
    fetchData();
  }, []);

  const handleProfessionalChange = async (profId: string) => {
    setFormData({ ...formData, professional_id: profId, data: '', hora: '' });
    setBusySlots([]);
    if (!profId) return;
    try {
      const response = await axios.get(`/api/availability/${profId}`);
      setAvailabilities(response.data);
    } catch (error) {
      console.error('Erro ao carregar disponibilidade');
    }
  };

  const handleDateChange = async (date: string) => {
    setFormData({ ...formData, data: date, hora: '' });
    if (!date || !formData.professional_id) return;
    try {
      const res = await axios.get(`/api/appointments/busy-slots?professional_id=${formData.professional_id}&data=${date}`);
      setBusySlots(res.data);
    } catch (error) {
      console.error('Erro ao buscar horários ocupados');
    }
  };

  const getValidSlots = () => {
    if (!formData.data || !formData.service_id) return [];

    const selectedService = services.find(s => String(s.id) === formData.service_id);
    const duration = selectedService ? selectedService.duracao : 30;
    const date = formData.data;
    const ranges = availabilities.filter(a => new Date(a.data).toISOString().split('T')[0] === date);

    const slots: string[] = [];
    ranges.forEach(range => {
      let current = new Date(`${date}T${range.hora_inicio}`);
      const end = new Date(`${date}T${range.hora_fim}`);

      while (current < end) {
        const timeStr = current.toTimeString().substring(0, 5);
        const slotEnd = new Date(current.getTime() + duration * 60000);
        const slotEndStr = slotEnd.toTimeString().substring(0, 5);

        if (slotEndStr > range.hora_fim) break;

        const isBusy = busySlots.some((bsTime: string) => bsTime >= timeStr && bsTime < slotEndStr);
        if (!isBusy) slots.push(timeStr);

        current.setMinutes(current.getMinutes() + 30);
      }
    });
    return slots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/appointments/', {
        ...formData,
        service_id: parseInt(formData.service_id),
        professional_id: parseInt(formData.professional_id),
        data: new Date(formData.data).toISOString()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Solicitação enviada com sucesso!');
      onSuccess();
    } catch (error) {
      alert('Erro ao agendar: ' + (error.response?.data?.detail || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      <div className="space-y-2">
        <label className="text-xs font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
          <Heart className="w-3 h-3 text-brand-gold" />
          Serviço Desejado
        </label>
        <select
          className="w-full p-3 bg-brand-light border border-brand-gold/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:outline-none text-sm transition-all"
          onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
          required
          value={formData.service_id}
        >
          <option value="">Selecione o procedimento...</option>
          {(Array.isArray(services) ? services : []).map(s => <option key={s.id} value={s.id}>{s.nome} — R$ {s.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
          <User className="w-3 h-3 text-brand-gold" />
          Especialista
        </label>
        <select
          className="w-full p-3 bg-brand-light border border-brand-gold/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:outline-none text-sm transition-all"
          onChange={(e) => handleProfessionalChange(e.target.value)}
          required
          value={formData.professional_id}
        >
          <option value="">Selecione o especialista...</option>
          {(Array.isArray(professionals) ? professionals : []).map(p => <option key={p.id} value={p.id}>{p.especialidade}</option>)}
        </select>
      </div>

      {formData.professional_id && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3 text-brand-gold" />
              Datas Disponíveis
            </label>
            <select
              className="w-full p-3 bg-brand-light border border-brand-gold/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:outline-none text-sm transition-all"
              onChange={(e) => handleDateChange(e.target.value)}
              required
              value={formData.data}
            >
              <option value="">Selecione a data...</option>
              {[...new Set((Array.isArray(availabilities) ? availabilities : []).map(a => new Date(a.data).toISOString().split('T')[0]))].map(date => (
                <option key={date} value={date}>{new Date(date).toLocaleDateString('pt-BR')}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3 text-brand-gold" />
              Horário
            </label>
            <select
              className="w-full p-3 bg-brand-light border border-brand-gold/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:outline-none text-sm transition-all"
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              required
              value={formData.hora}
              disabled={!formData.data}
            >
              <option value="">Selecione o horário...</option>
              {(Array.isArray(getValidSlots()) ? getValidSlots() : []).map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !formData.hora}
        className={`w-full bg-brand-dark text-white p-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Processando...' : 'Confirmar Agendamento'}
      </button>
    </form>
  );
};

export default AppointmentForm;
