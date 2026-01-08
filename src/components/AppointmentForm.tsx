import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ onSuccess }) => {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [formData, setFormData] = useState({
    service_id: '',
    professional_id: '',
    data: '',
    hora: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const [sRes, pRes] = await Promise.all([
        axios.get('http://localhost:8000/services/'),
        axios.get('http://localhost:8000/professionals/')
      ]);
      setServices(sRes.data);
      setProfessionals(pRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/appointments/', {
        ...formData,
        service_id: parseInt(formData.service_id),
        professional_id: parseInt(formData.professional_id),
        data: new Date(formData.data).toISOString()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Solicitação enviada!');
      onSuccess();
    } catch (error) {
      alert('Erro ao agendar: ' + (error.response?.data?.detail || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Serviço</label>
        <select 
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, service_id: e.target.value})}
          required
        >
          <option value="">Selecione...</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.nome} - R$ {s.preco}</option>)}
        </select>
      </div>
      <div>
        <label className="block mb-1">Profissional</label>
        <select 
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, professional_id: e.target.value})}
          required
        >
          <option value="">Selecione...</option>
          {professionals.map(p => <option key={p.id} value={p.id}>{p.especialidade}</option>)}
        </select>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1">Data</label>
          <input 
            type="date" 
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({...formData, data: e.target.value})}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1">Hora</label>
          <input 
            type="time" 
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({...formData, hora: e.target.value})}
            required
          />
        </div>
      </div>
      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Solicitar Agendamento
      </button>
    </form>
  );
};

export default AppointmentForm;
