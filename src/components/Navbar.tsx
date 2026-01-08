import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, Scissors, User } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter">LA PRIME</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Painel
                </Link>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-900">{user.email.split('@')[0]}</span>
                    <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">{user.role}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Sair do sistema"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Entrar</Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
