import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ProfessionalDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/appointments/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments');
      }
    };
    fetchAppointments();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'APROVADO': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'RECUSADO': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Minha Agenda Profissional</h1>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-500 uppercase font-bold">Hoje</p>
            <p className="text-lg font-bold text-blue-600">
              {appointments.filter(a => new Date(a.data).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Cronograma de Atendimentos</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {appointments.length === 0 ? (
            <div className="p-12 text-center text-gray-500">Nenhum atendimento agendado no momento.</div>
          ) : appointments.map((appt) => (
            <div key={appt.id} className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors">
              <div className="flex items-center gap-6">
                <div className="text-center w-16">
                  <p className="text-sm font-bold text-gray-900">{new Date(appt.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
                  <p className="text-xs text-gray-500">{appt.hora}</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-800 text-sm">Cliente ID: {appt.cliente_id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Serviço ID: {appt.service_id}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                {getStatusIcon(appt.status)}
                <span className="text-xs font-bold text-gray-600">{appt.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
