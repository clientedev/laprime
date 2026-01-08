import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Minha Agenda</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Próximos Atendimentos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Data</th>
                <th className="py-2">Hora</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b">
                  <td className="py-2">{new Date(appt.data).toLocaleDateString()}</td>
                  <td className="py-2">{appt.hora}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      appt.status === 'APROVADO' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
