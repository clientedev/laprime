import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Scissors } from 'lucide-react';

const ProfessionalDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.get('/api/appointments/my', { headers });
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments');
      }
    };
    fetchAppointments();
  }, []);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'APROVADO': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'RECUSADO': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-brand-gold" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-5xl font-serif font-bold text-brand-dark tracking-tight">Minha Agenda</h1>
          <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs mt-2">Atendimentos Profissionais La Prime</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-8 py-4 rounded-2xl shadow-xl border border-brand-gold/10 text-center hover:scale-105 transition-transform">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Hoje</p>
            <p className="text-3xl font-serif font-bold text-brand-gold">
              {appointments.filter((a: any) => new Date(a.data).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-brand-gold/10 overflow-hidden">
        <div className="px-10 py-6 bg-brand-dark flex justify-between items-center">
          <h2 className="font-serif font-bold text-white text-xl">Cronograma de Atendimentos</h2>
          <Scissors className="text-brand-gold w-6 h-6" />
        </div>
        <div className="divide-y divide-gray-100 font-sans">
          {appointments.length === 0 ? (
            <div className="p-20 text-center font-serif text-xl italic text-gray-400">Tudo calmo. Nenhum atendimento agendado no momento.</div>
          ) : appointments.map((appt: any) => (
            <div key={appt.id} className="p-8 hover:bg-brand-light/20 flex flex-col md:flex-row items-center justify-between transition-colors gap-6">
              <div className="flex items-center gap-8">
                <div className="text-center w-20">
                  <p className="text-lg font-black text-brand-dark uppercase">{new Date(appt.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
                  <p className="text-xs font-bold text-brand-gold tracking-widest mt-1">{appt.hora}</p>
                </div>
                <div className="h-12 w-px bg-brand-gold/20" />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <User className="w-4 h-4 text-brand-gold" />
                    <span className="font-bold text-brand-dark text-lg">Cliente #ID: {appt.cliente_id}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Serviço Especializado</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-brand-light border border-brand-gold/20">
                {getStatusIcon(appt.status)}
                <span className="text-xs font-black text-brand-dark tracking-widest uppercase">{appt.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
