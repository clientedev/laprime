import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ClientDashboard from './components/ClientDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                user.role === 'ADMIN' ? <AdminDashboard /> :
                user.role === 'PROFISSIONAL' ? <ProfessionalDashboard /> :
                <ClientDashboard />
              ) : <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
