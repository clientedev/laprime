import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(\`http://localhost:8000/appointments/\${id}/status?status=\${status}\`, {}, {
        headers: { Authorization: \`Bearer \${token}\` }
      });
      window.location.reload();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  if (!stats) return <div>Carregando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h3 className="text-lg font-semibold">Total Agendamentos</h3>
          <p className="text-2xl">{stats.total_appointments}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h3 className="text-lg font-semibold">Taxa de Aprovação</h3>
          <p className="text-2xl">{stats.approval_rate.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h3 className="text-lg font-semibold">Clientes Ativos</h3>
          <p className="text-2xl">{stats.active_clients}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Gerenciar Agendamentos Pendentes</h2>
        <div className="space-y-4">
          {/* This would ideally be a separate component for better state management */}
          <p className="text-sm text-gray-500">Utilize os endpoints de gerenciamento para aprovar/recusar solicitações.</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded shadow mb-8">
        <ul>
          {stats.services_usage.map((service, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{service.name}</span>
              <span className="font-bold">{service.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
