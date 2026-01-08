import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ClientDashboard from './components/ClientDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
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
      <div className="min-h-screen bg-brand-light">
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
