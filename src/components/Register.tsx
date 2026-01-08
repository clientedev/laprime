import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '', role: 'CLIENTE' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/auth/register', formData);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome Completo" 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
        />
        <select 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="CLIENTE">Sou Cliente</option>
          <option value="PROFISSIONAL">Sou Profissional</option>
        </select>
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
