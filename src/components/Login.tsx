import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', new URLSearchParams({
        username: email,
        password: password
      }));
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      
      // Real app would fetch profile, here we infer role for demo or simple logic
      // In production, backend should return user data with login
      const role = email.includes('admin') ? 'ADMIN' : (email.includes('pro') ? 'PROFISSIONAL' : 'CLIENTE');
      const user = { email, role }; 
      onLogin(user);
      navigate('/dashboard');
    } catch (error) {
      alert('Login falhou. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bem-vindo de volta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Novo por aqui?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Crie sua conta gratuita
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-blue-400 group-hover:text-blue-300" aria-hidden="true" />
              </span>
              {loading ? 'Entrando...' : 'Acessar Sistema'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
