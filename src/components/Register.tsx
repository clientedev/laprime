import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, UserCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '', role: 'CLIENTE' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/register', formData);
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar: ' + (error.response?.data?.detail || 'Verifique seus dados'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="inline-flex p-4 bg-green-50 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Criar sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Já possui uma conta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Faça login aqui
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <UserCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nome Completo"
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Endereço de e-mail"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Senha de acesso"
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              />
            </div>
            <div className="relative">
              <select
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="CLIENTE">Sou Cliente (Desejo agendar)</option>
                <option value="PROFISSIONAL">Sou Profissional (Desejo atender)</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
