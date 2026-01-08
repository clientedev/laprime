import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Plus, Scissors } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

const ClientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.get('/api/appointments/my', { headers });
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };
    fetchData();
  }, [refresh]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'APROVADO': return 'bg-green-50 text-green-700 border-green-100';
      case 'RECUSADO': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-brand-light text-brand-gold border-brand-gold/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Meus Agendamentos</h1>
          <p className="text-gray-500 font-sans mt-1">Gerencie suas consultas e procedimentos na La Prime.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-gold text-brand-dark px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:bg-opacity-90 shadow-lg font-bold font-sans"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Fechar Formulário' : 'Novo Agendamento'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-1 transition-all duration-300 ${showForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-brand-gold/10 sticky top-24">
            <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6 flex items-center gap-2">
              <Scissors className="w-6 h-6 text-brand-gold" />
              Agendar Serviço
            </h2>
            <AppointmentForm onSuccess={() => {
              setRefresh(r => r + 1);
              setShowForm(false);
            }} />
          </div>
        </div>

        <div className={`${showForm ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="bg-white rounded-2xl shadow-xl border border-brand-gold/10 overflow-hidden">
            <div className="px-8 py-6 bg-brand-light/50 border-b border-brand-gold/10 flex justify-between items-center">
              <h2 className="font-serif font-bold text-brand-dark text-xl">Histórico de Solicitações</h2>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-white px-3 py-1 rounded-full">{appointments.length} REGISTROS</span>
            </div>
            <div className="divide-y divide-gray-100">
              {appointments.length === 0 ? (
                <div className="p-20 text-center">
                  <div className="inline-flex p-6 bg-brand-light rounded-full mb-6 text-brand-gold">
                    <Calendar className="w-12 h-12" />
                  </div>
                  <p className="text-gray-500 font-serif text-xl italic">Você ainda não possui agendamentos.</p>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="mt-6 text-brand-gold font-bold hover:underline font-sans"
                  >
                    Fazer meu primeiro agendamento
                  </button>
                </div>
              ) : appointments.map((appt: any) => (
                <div key={appt.id} className="p-8 hover:bg-brand-light/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="bg-brand-light p-4 rounded-xl text-brand-gold">
                      <Clock className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-brand-dark text-2xl">
                        {new Date(appt.data).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                      </h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-500 font-sans">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-gold" /> {appt.hora}
                        </span>
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4 text-brand-gold" /> Profissional ID: {appt.professional_id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black border tracking-widest ${getStatusColor(appt.status)}`}>
                      {appt.status}
                    </span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Solicitado em {new Date(appt.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
