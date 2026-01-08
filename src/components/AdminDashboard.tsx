import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [statsRes, apptsRes] = await Promise.all([
          axios.get('http://localhost:8000/admin/dashboard', { headers }),
          axios.get('http://localhost:8000/appointments/my', { headers })
        ]);
        setStats(statsRes.data);
        setAppointments(apptsRes.data.filter(a => a.status === 'PENDENTE'));
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:8000/appointments/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.reload();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  if (!stats) return <div className="p-8 text-center">Carregando dados do sistema...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo BI</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total de Agendamentos</p>
          <p className="text-3xl font-bold text-blue-600">{stats.total_appointments}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Taxa de Aprovação</p>
          <p className="text-3xl font-bold text-green-600">{stats.approval_rate.toFixed(1)}%</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Clientes Ativos</p>
          <p className="text-3xl font-bold text-purple-600">{stats.active_clients}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Serviços Oferecidos</p>
          <p className="text-3xl font-bold text-orange-600">{stats.services_usage.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Volume por Serviço</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.services_usage}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Distribuição de Demanda</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.services_usage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="name"
                >
                  {stats.services_usage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Agendamentos Pendentes</h2>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {appointments.length} SOLICITAÇÕES
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Data/Hora</th>
                <th className="px-6 py-3">Serviço</th>
                <th className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Nenhum agendamento pendente</td></tr>
              ) : appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">ID: {appt.cliente_id}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(appt.data).toLocaleDateString()} às {appt.hora}
                  </td>
                  <td className="px-6 py-4">ID: {appt.service_id}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button 
                      onClick={() => handleStatusUpdate(appt.id, 'APROVADO')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                    >
                      Aprovar
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(appt.id, 'RECUSADO')}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                    >
                      Recusar
                    </button>
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

export default AdminDashboard;
