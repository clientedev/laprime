import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, Scissors, Heart } from 'lucide-react';

const AppointmentForm = ({ onSuccess }) => {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [formData, setFormData] = useState({
    service_id: '',
    professional_id: '',
    data: '',
    hora: ''
  });
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
          onChange={(e) => setFormData({...formData, service_id: e.target.value})}
          required
          value={formData.service_id}
        >
          <option value="">Selecione o procedimento...</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.nome} — R$ {s.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
          <User className="w-3 h-3 text-brand-gold" />
          Profissional
        </label>
        <select 
          className="w-full p-3 bg-brand-light border border-brand-gold/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:outline-none text-sm transition-all"
          onChange={(e) => setFormData({...formData, professional_id: e.target.value})}
          required
          value={formData.professional_id}
        >
          <option value="">Selecione quem irá te atender...</option>
          {professionals.map(p => <option key={p.id} value={p.id}>{p.especialidade} (Especialista)</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
            <Calendar className="w-3 h-3 text-brand-gold" />
            Data
          </label>
          <input 
            type="date" 
            className="w-full p-3 bg-brand-light border border-brand-gold/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:outline-none text-sm transition-all"
            onChange={(e) => setFormData({...formData, data: e.target.value})}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
            <Clock className="w-3 h-3 text-brand-gold" />
            Horário
          </label>
          <input 
            type="time" 
            className="w-full p-3 bg-brand-light border border-brand-gold/20 rounded-xl focus:ring-2 focus:ring-brand-gold focus:outline-none text-sm transition-all"
            onChange={(e) => setFormData({...formData, hora: e.target.value})}
            required
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className={`w-full bg-brand-dark text-white p-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg \${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Processando...' : 'Confirmar Agendamento'}
      </button>
    </form>
  );
};

export default AppointmentForm;
