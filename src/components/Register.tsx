import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, UserCircle, ShieldCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', senha: '', role: 'CLIENTE' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.senha) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
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
    <div className="min-h-screen flex items-center justify-center bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-brand-gold/20">
        <div className="text-center">
          <div className="inline-flex p-4 bg-brand-light rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-brand-dark tracking-tight">Criar sua conta</h2>
          <p className="mt-2 text-sm text-gray-600 font-sans">
            Já possui uma conta?{' '}
            <Link to="/login" className="font-medium text-brand-gold hover:text-opacity-80">
              Faça login aqui
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <UserCircle className="absolute left-3 top-3 w-5 h-5 text-brand-gold/50" />
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-200 placeholder-gray-400 text-brand-dark rounded-t-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm font-sans"
                placeholder="Nome Completo"
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-brand-gold/50" />
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-200 placeholder-gray-400 text-brand-dark focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm font-sans"
                placeholder="Endereço de e-mail"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 w-5 h-5 text-brand-gold/50" />
              <input
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-200 placeholder-gray-400 text-brand-dark focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm font-sans"
                placeholder="Telefone (DDD + Número)"
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-brand-gold/50" />
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-200 placeholder-gray-400 text-brand-dark rounded-b-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm font-sans"
                placeholder="Senha de acesso"
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-brand-dark bg-brand-gold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-all font-sans ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
