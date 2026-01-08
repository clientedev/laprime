import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Calendar, Scissors, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const COLORS = ['#bda07e', '#0d2438', '#3c3c3c', '#8884d8', '#f5f1ed'];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [statsRes, apptsRes] = await Promise.all([
          axios.get('/api/admin/dashboard', { headers }),
          axios.get('/api/appointments/my', { headers })
        ]);
        setStats(statsRes.data);
        setAppointments(apptsRes.data.filter((a: any) => a.status === 'PENDENTE'));
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`/api/appointments/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.reload();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  if (!stats) return <div className="p-20 text-center font-serif text-2xl text-brand-dark italic">Carregando inteligência de dados...</div>;

  return (
    <div className="space-y-12 py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-5xl font-serif font-bold text-brand-dark tracking-tight">Painel Executivo</h1>
          <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mt-2">Business Intelligence La Prime</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Agendamentos', val: stats.total_appointments, icon: <Calendar />, color: 'text-brand-dark' },
          { label: 'Taxa Aprovação', val: `${stats.approval_rate.toFixed(1)}%`, icon: <CheckCircle />, color: 'text-green-600' },
          { label: 'Clientes Ativos', val: stats.active_clients, icon: <Users />, color: 'text-brand-gold' },
          { label: 'Especialidades', val: stats.services_usage.length, icon: <Scissors />, color: 'text-purple-600' }
        ].map((kpi, i) => (
          <div key={i} className="p-8 bg-white rounded-3xl shadow-xl border border-brand-gold/5 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 bg-brand-light rounded-2xl text-brand-gold">
                {React.cloneElement(kpi.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <p className={`text-4xl font-serif font-bold ${kpi.color}`}>{kpi.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-gold/5">
          <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8 flex items-center gap-3">
            <TrendingUp className="text-brand-gold w-6 h-6" />
            Demanda por Serviço
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.services_usage}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{fill: '#3c3c3c', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#3c3c3c', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f5f1ed'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="count" fill="#bda07e" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-gold/5">
          <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8 flex items-center gap-3">
            <TrendingUp className="text-brand-gold w-6 h-6" />
            Distribuição de Volume
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.services_usage}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="count"
                  nameKey="name"
                >
                  {stats.services_usage.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '40px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-brand-gold/10 overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-brand-dark">
          <h2 className="text-2xl font-serif font-bold text-white">Solicitações Pendentes</h2>
          <span className="bg-brand-gold text-brand-dark text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest">
            {appointments.length} NOVOS AGENDAMENTOS
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-light text-brand-dark text-xs uppercase font-black tracking-widest">
              <tr>
                <th className="px-10 py-5">Cliente</th>
                <th className="px-10 py-5">Data & Hora</th>
                <th className="px-10 py-5">Especialidade</th>
                <th className="px-10 py-5">Decisão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {appointments.length === 0 ? (
                <tr><td colSpan={4} className="px-10 py-20 text-center text-gray-400 font-serif text-xl italic">Toda a agenda está em dia.</td></tr>
              ) : appointments.map((appt: any) => (
                <tr key={appt.id} className="hover:bg-brand-light/20 transition-colors">
                  <td className="px-10 py-6 font-bold text-brand-dark">ID: {appt.cliente_id}</td>
                  <td className="px-10 py-6 text-gray-600">
                    <span className="font-bold">{new Date(appt.data).toLocaleDateString()}</span> às {appt.hora}
                  </td>
                  <td className="px-10 py-6 text-brand-gold font-bold">Serviço #{appt.service_id}</td>
                  <td className="px-10 py-6">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleStatusUpdate(appt.id, 'APROVADO')}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md shadow-green-100 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Aprovar
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(appt.id, 'RECUSADO')}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md shadow-red-100 flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Recusar
                      </button>
                    </div>
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
