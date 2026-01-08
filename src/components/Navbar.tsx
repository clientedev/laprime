import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Clínica Estética</Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Olá, {user.email}</span>
              <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">Sair</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Cadastrar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
