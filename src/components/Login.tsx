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

      // Get real user profile from server
      const userRes = await axios.get('/api/users/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      onLogin(userRes.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login falhou. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-brand-gold/20">
        <div className="text-center">
          <div className="inline-flex p-4 bg-brand-light rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-brand-dark tracking-tight">Bem-vindo de volta</h2>
          <p className="mt-2 text-sm text-gray-600 font-sans">
            Novo por aqui?{' '}
            <Link to="/register" className="font-medium text-brand-gold hover:text-opacity-80">
              Crie sua conta gratuita
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-brand-gold/50" />
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-200 placeholder-gray-400 text-brand-dark rounded-t-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm font-sans"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-brand-gold/50" />
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-200 placeholder-gray-400 text-brand-dark rounded-b-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm font-sans"
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
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-brand-dark bg-brand-gold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-all font-sans \${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-brand-dark/50 group-hover:text-brand-dark" aria-hidden="true" />
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
