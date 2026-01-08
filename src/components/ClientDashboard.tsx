import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'APROVADO': return 'bg-green-100 text-green-800 border-green-200';
      case 'RECUSADO': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Meus Agendamentos</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Fechar Formulário' : 'Novo Agendamento'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-1 transition-all duration-300 ${showForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Agendar Serviço
            </h2>
            <AppointmentForm onSuccess={() => {
              setRefresh(r => r + 1);
              setShowForm(false);
            }} />
          </div>
        </div>

        <div className={`${showForm ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">Histórico de Solicitações</h2>
              <span className="text-xs font-medium text-gray-500">{appointments.length} registros encontrados</span>
            </div>
            <div className="divide-y divide-gray-100">
              {appointments.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4">
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-gray-500">Você ainda não possui agendamentos.</p>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="mt-4 text-blue-600 font-semibold hover:underline"
                  >
                    Fazer meu primeiro agendamento
                  </button>
                </div>
              ) : appointments.map((appt) => (
                <div key={appt.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {new Date(appt.data).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {appt.hora}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" /> Profissional ID: {appt.professional_id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(appt.status)}`}>
                      {appt.status}
                    </span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
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
