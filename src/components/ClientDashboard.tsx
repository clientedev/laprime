import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppointmentForm from './AppointmentForm';

const ClientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.get('http://localhost:8000/appointments/my', { headers });
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meus Agendamentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Novo Agendamento</h2>
          <AppointmentForm onSuccess={() => setRefresh(r => r + 1)} />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Histórico</h2>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id} className="border-b py-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{new Date(appt.data).toLocaleDateString()} às {appt.hora}</span>
                  <span className={`px-2 rounded text-sm ${
                    appt.status === 'APROVADO' ? 'bg-green-100 text-green-800' : 
                    appt.status === 'RECUSADO' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
